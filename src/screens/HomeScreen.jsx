import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

const STALE_AFTER_MS = 5 * 60 * 1000;

export default function HomeScreen() {
  const { refreshUser } = useContext(AuthContext);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const handleBuy = async (price) => {
    try {
      setLoadingBuy(true);

      // parse price like '45€' -> 45
      const amount = parseFloat(String(price).replace(/[^0-9.,]/g, "").replace(",", ".")) || 0;

      const payload = {
        quantity: 1,
        unit_price: amount,
        currency: "EUR",
      };

      console.log("HomeScreen: purchasing", payload);

      await API.post("/purchases/purchase", payload);

      // Refresh user data (wallet/purchases)
      await refreshUser();

      Alert.alert("Achat effectué", "Votre achat a été enregistré.");
    } catch (error) {
      console.log("PURCHASE ERROR:", error?.response?.data || error.message);
      Alert.alert("Erreur", "Impossible de compléter l'achat.");
    } finally {
      setLoadingBuy(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#C05A86", "#FF79A8"]} style={styles.header}>
        <Text style={styles.headerTitle}>Horaires des trains</Text>
        <Text style={styles.headerSubtitle}>Prédictions + état réel du train</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.realStatusCard}>
          <View style={[styles.realStatusIconBox, { backgroundColor: globalStatus.softColor }]}>
            <Ionicons name={globalStatus.icon} size={26} color={globalStatus.color} />
          </View>

          <View style={styles.realStatusTextBox}>
            <Text style={[styles.realStatusTitle, { color: globalStatus.color }]}>
              {globalStatus.title}
            </Text>
            <Text style={styles.realStatusSubtitle}>{globalStatus.subtitle}</Text>
          </View>

          {trainStatus?.train_running && !isTrainOffline() && (
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#F36F98" />
            <Text style={styles.loadingText}>Chargement des horaires...</Text>
          </View>
        ) : schedules.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="train-outline" size={42} color="#C05A86" />
            <Text style={styles.emptyTitle}>{emptyMessage.title}</Text>
            <Text style={styles.emptyText}>{emptyMessage.text}</Text>
          </View>
        ) : (
          schedules.map((schedule, index) => {
            const status = getScheduleStatus(schedule, index);
            const isMoving = status.status === "moving";
            const isLateMoving = status.status === "late-moving";
            const isStopped = status.status === "stopped";
            const isLate = status.status === "late";
            const isOffline = status.status === "offline";
            const isPaused = status.status === "paused";
            const isNext = index === 0;

            return (
              <View
                key={schedule._id}
                style={[
                  styles.card,
                  isNext && styles.cardNext,
                  isMoving && styles.cardMoving,
                  isLateMoving && styles.cardLate,
                  isStopped && styles.cardStopped,
                  isLate && styles.cardLate,
                  isOffline && styles.cardOffline,
                  isPaused && styles.cardPaused,
                ]}
              >
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      styles.statusBadgeWaiting,
                      isMoving && styles.statusBadgeMoving,
                      isLateMoving && styles.statusBadgeLate,
                      isStopped && styles.statusBadgeStopped,
                      isLate && styles.statusBadgeLate,
                      isOffline && styles.statusBadgeOffline,
                      isPaused && styles.statusBadgePaused,
                    ]}
                  >
                    <Ionicons
                      name={
                        isMoving || isLateMoving
                          ? "radio-outline"
                          : isStopped || isPaused
                            ? "pause-circle-outline"
                            : isLate
                              ? "alert-circle-outline"
                              : isOffline
                                ? "cloud-offline-outline"
                                : "time-outline"
                      }
                      size={15}
                      color="#FFFFFF"
                    />
                    <Text style={styles.statusBadgeText}>{status.badge}</Text>
                  </View>

                  {(isMoving || isLateMoving) && (
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>

                <View style={styles.timerCenter}>
                  <Text style={styles.timerLabel}>{status.label}</Text>
                  <Text
                    style={[
                      styles.timer,
                      isMoving && styles.timerMoving,
                      isLateMoving && styles.timerLate,
                      isStopped && styles.timerStopped,
                      isLate && styles.timerLate,
                      (isOffline || isPaused) && styles.timerMuted,
                    ]}
                  >
                    {status.timer}
                  </Text>
                </View>

                <View style={styles.routeRow}>
                  <View style={styles.stationBlock}>
                    <View style={styles.stationNameRow}>
                      <View style={styles.greenDot} />
                      <Text style={styles.stationName}>
                        {formatStation(schedule.departure_station)}
                      </Text>
                    </View>
                    <Text style={styles.time}>{formatTime(schedule.departure_time)}</Text>
                  </View>

                  <View style={styles.durationBlock}>
                    <Ionicons
                      name={isMoving || isLateMoving ? "train-outline" : "arrow-forward-outline"}
                      size={24}
                      color={isMoving || isLateMoving ? "#C05A86" : "#FF79A8"}
                    />
                    <View style={styles.line} />
                  </View>

                  <View style={styles.stationBlockRight}>
                    <View style={styles.stationNameRowRight}>
                      <Text style={styles.stationName}>
                        {formatStation(schedule.arrival_station)}
                      </Text>
                      <View style={styles.pinkDot} />
                    </View>
                    <Text style={styles.timeRight}>{formatTime(schedule.arrival_time)}</Text>
                  </View>
                </View>

              {!train.full && (
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleBuy(train.price)}
                  disabled={loadingBuy}
                >
                  <Text style={styles.buyButtonText}>{loadingBuy ? "Loading..." : "Acheter"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFE7DF" },
  header: {
    paddingTop: 28,
    paddingHorizontal: 18,
    paddingBottom: 34,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
  },
  scroll: { flex: 1, marginTop: 18 },
  scrollContent: { paddingHorizontal: 10, paddingBottom: 120 },
  realStatusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  realStatusIconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  realStatusTextBox: { flex: 1 },
  realStatusTitle: { fontSize: 16, fontWeight: "900" },
  realStatusSubtitle: {
    color: "#5D6673",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  cardNext: { borderColor: "#FFD0E0" },
  cardMoving: {
    borderColor: "#F36F98",
    shadowColor: "#F36F98",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  cardStopped: { borderColor: "#D8C4B6" },
  cardLate: { borderColor: "#F6B35C" },
  cardOffline: { borderColor: "#CBD5E1" },
  cardPaused: { borderColor: "#D8C4B6" },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 20,
  },
  statusBadgeWaiting: { backgroundColor: "#E97991" },
  statusBadgeMoving: { backgroundColor: "#C05A86" },
  statusBadgeStopped: { backgroundColor: "#A68A7B" },
  statusBadgeLate: { backgroundColor: "#F59E0B" },
  statusBadgeOffline: { backgroundColor: "#64748B" },
  statusBadgePaused: { backgroundColor: "#A68A7B" },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFE4EF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#F36F98",
  },
  liveText: { color: "#C05A86", fontSize: 11, fontWeight: "900" },
  timerCenter: {
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#FFF3F7",
    borderRadius: 18,
    paddingVertical: 12,
  },
  timerLabel: {
    color: "#8A5168",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 3,
  },
  timer: {
    color: "#C75B82",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1,
  },
  timerMoving: { color: "#B73E72" },
  timerStopped: { color: "#8A6F63" },
  timerLate: { color: "#D97706" },
  timerMuted: { color: "#64748B" },
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stationBlock: { flex: 1.2 },
  stationBlockRight: { flex: 1.2, alignItems: "flex-end" },
  stationNameRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  stationNameRowRight: { flexDirection: "row", alignItems: "center", gap: 7 },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#B8D8A2",
  },
  pinkDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E97991",
  },
  stationName: {
    color: "#062044",
    fontSize: 13,
    fontWeight: "800",
  },
  time: {
    color: "#5D6673",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 17,
    fontWeight: "700",
  },
  timeRight: {
    color: "#5D6673",
    fontSize: 12,
    marginTop: 8,
    marginRight: 17,
    fontWeight: "700",
  },
  durationBlock: { alignItems: "center", flex: 0.7, marginTop: 2 },
  line: {
    width: 38,
    height: 3,
    backgroundColor: "#FFE4EF",
    borderRadius: 10,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginTop: 16,
    marginBottom: 14,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  helperText: {
    color: "#5D6673",
    fontSize: 11,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },
  detailsButton: {
    backgroundColor: "#F36F98",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 14,
    shadowColor: "#F36F98",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  loadingText: {
    marginTop: 12,
    color: "#5D6673",
    fontWeight: "700",
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginHorizontal: 8,
    padding: 28,
    borderRadius: 18,
  },
  emptyTitle: {
    marginTop: 10,
    color: "#062044",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    marginTop: 6,
    color: "#5D6673",
    fontSize: 12,
    textAlign: "center",
  },
});