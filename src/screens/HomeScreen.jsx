import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import API from "../services/api";

const STALE_AFTER_MS = 5 * 60 * 1000;

export default function HomeScreen() {
  const [schedules, setSchedules] = useState([]);
  const [trainStatus, setTrainStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  const fetchData = async () => {
    try {
      const [scheduleRes, statusRes] = await Promise.all([
        API.get("/train-schedules/upcoming"),
        API.get("/train-status"),
      ]);

      setSchedules(scheduleRes.data);
      setTrainStatus(statusRes.data);
    } catch (error) {
      console.log("Train data fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      setNow(new Date());
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatCountdown = (ms) => {
    if (ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const formatStation = (station) => {
    if (!station) return "Station inconnue";
    return station.replace("station-", "Station ").replace("station_", "Station ");
  };

  const isTrainOffline = () => {
    if (!trainStatus) return true;
    if (trainStatus.service_status === "offline") return true;
    if (!trainStatus.last_seen_at) return true;

    const lastSeen = new Date(trainStatus.last_seen_at);
    return now - lastSeen > STALE_AFTER_MS;
  };

  const isTrainPaused = () => {
    if (!trainStatus) return false;
    if (trainStatus.train_running) return false;
    if (!trainStatus.last_stopped_at) return false;

    const stoppedAt = new Date(trainStatus.last_stopped_at);
    return now - stoppedAt > 2 * 60 * 1000;
  };

  const getGlobalStatus = () => {
    if (isTrainOffline()) {
      return {
        title: "Hors ligne",
        subtitle: "Le train n’est pas connecté au réseau.",
        icon: "cloud-offline-outline",
        color: "#64748B",
        softColor: "#EEF2F7",
      };
    }

    if (isTrainPaused()) {
      return {
        title: "Service en pause",
        subtitle: `Dernière station connue : ${formatStation(trainStatus?.last_known_station)}`,
        icon: "pause-circle-outline",
        color: "#A68A7B",
        softColor: "#F6EFEA",
      };
    }

    if (trainStatus?.train_running) {
      return {
        title: "Train en route",
        subtitle: `Départ réel confirmé depuis ${formatStation(trainStatus?.last_known_station)}`,
        icon: "train-outline",
        color: "#C05A86",
        softColor: "#FFF3F7",
      };
    }

    return {
      title: "Train arrêté",
      subtitle: `Position actuelle : ${formatStation(trainStatus?.last_known_station)}`,
      icon: "radio-button-on-outline",
      color: "#E97991",
      softColor: "#FFF3F7",
    };
  };

  const getScheduleStatus = (schedule, index) => {
  const departure = new Date(schedule.departure_time);
  const arrival = new Date(schedule.arrival_time);

  const isFirstCard = index === 0;
  const trainRunning = trainStatus?.train_running === true;
  const lastKnownStation = trainStatus?.last_known_station;

  const trainIsAtDepartureStation =
    lastKnownStation === schedule.departure_station;

  const trainIsAtArrivalStation =
    lastKnownStation === schedule.arrival_station;

  if (isTrainOffline()) {
    return {
      label: "Hors ligne",
      timer: "--:--",
      status: "offline",
      badge: "OFFLINE",
      helper: "Le train n’est pas connecté. Horaire affiché à titre indicatif.",
    };
  }

  if (isTrainPaused()) {
    return {
      label: "Service en pause",
      timer: "--:--",
      status: "paused",
      badge: "PAUSE",
      helper: "Le train est arrêté depuis un moment. Les nouvelles prédictions sont suspendues.",
    };
  }

  // TRAIN ROULE VRAIMENT
  if (isFirstCard && trainRunning) {
    if (now > arrival) {
      return {
        label: "Retard estimé",
        timer: `+${formatCountdown(now - arrival)}`,
        status: "late-moving",
        badge: "RETARD",
        helper: "Le train roule encore malgré l’heure d’arrivée prévue.",
      };
    }

    return {
      label: "Arrive dans",
      timer: formatCountdown(arrival - now),
      status: "moving",
      badge: "EN ROUTE",
      helper: "Le train est réellement en déplacement.",
    };
  }

  // TRAIN ARRIVÉ À LA STATION
  if (isFirstCard && !trainRunning && trainIsAtArrivalStation) {
    return {
      label: "Arrivé",
      timer: "00:00",
      status: "stopped",
      badge: "ARRIVÉ",
      helper: `Le train est arrivé à ${formatStation(lastKnownStation)}.`,
    };
  }

  // TRAIN EN PAUSE AVANT LE PROCHAIN DÉPART
  if (!trainRunning && trainIsAtDepartureStation && now < departure) {
    return {
      label: "Départ dans",
      timer: formatCountdown(departure - now),
      status: "waiting",
      badge: isFirstCard ? "PROCHAIN" : "À VENIR",
      helper: `Le train attend à ${formatStation(lastKnownStation)} avant le prochain départ.`,
    };
  }

  // ARRIVÉE NON CONFIRMÉE
  if (isFirstCard && now > arrival && !trainRunning) {
    return {
      label: "À confirmer",
      timer: "00:00",
      status: "late",
      badge: "À CONFIRMER",
      helper: "L’heure prévue est passée, mais l’arrivée n’est pas confirmée.",
    };
  }

  // HORAIRE FUTUR NORMAL
  if (now < departure) {
    return {
      label: "Départ dans",
      timer: formatCountdown(departure - now),
      status: "waiting",
      badge: isFirstCard ? "PROCHAIN" : "À VENIR",
      helper: "Horaire prévu.",
    };
  }

  return {
    label: "Prévu",
    timer: "00:00",
    status: "waiting",
    badge: "À VENIR",
    helper: "Horaire prévu.",
  };
};

  const getEmptyMessage = () => {
    if (isTrainOffline()) {
      return {
        title: "Train hors ligne",
        text: "Aucun horaire actif, car le train n’est pas connecté.",
      };
    }

    if (isTrainPaused()) {
      return {
        title: "Service en pause",
        text: "Le train est arrêté depuis un moment. Les horaires reprendront au prochain départ réel.",
      };
    }

    if (trainStatus?.train_running) {
      return {
        title: "Train en route",
        text: "Le train roule, mais aucun horaire actif n’est disponible. Le backend recalculera au prochain départ réel.",
      };
    }

    return {
      title: "Aucun horaire disponible",
      text: "Les prochains passages apparaîtront quand le train démarrera réellement.",
    };
  };

  const globalStatus = getGlobalStatus();
  const emptyMessage = getEmptyMessage();

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

                <View style={styles.separator} />

                <View style={styles.bottomRow}>
                  <Text style={styles.helperText}>{status.helper}</Text>

                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Détails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFE7DF" },
  header: {
    paddingTop: 56,
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
  scroll: { flex: 1, marginTop: 10 },
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