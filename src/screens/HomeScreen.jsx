import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const trains = [
  {
    from: "Paris Gare de Lyon",
    to: "Lyon Part-Dieu",
    departure: "08:30",
    arrival: "10:30",
    duration: "2h00",
    price: "45€",
    full: false,
  },
  {
    from: "Paris Montparnasse",
    to: "Bordeaux St-Jean",
    departure: "09:15",
    arrival: "11:30",
    duration: "2h15",
    price: "52€",
    full: false,
  },
  {
    from: "Marseille St-Charles",
    to: "Nice Ville",
    departure: "10:00",
    arrival: "12:30",
    duration: "2h30",
    price: "38€",
    full: false,
  },
  {
    from: "Lille Europe",
    to: "Paris Nord",
    departure: "11:45",
    arrival: "12:45",
    duration: "1h00",
    price: "35€",
    full: true,
  },
  {
    from: "Strasbourg",
    to: "Paris Est",
    departure: "14:20",
    arrival: "16:10",
    duration: "1h50",
    price: "48€",
    full: false,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#C05A86", "#FF79A8"]} style={styles.header}>
        <Text style={styles.headerTitle}>Horaires des trains</Text>

        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>Tous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Aujourd'hui</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Disponibles</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {trains.map((train, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.routeRow}>
              <View style={styles.stationBlock}>
                <View style={styles.stationNameRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.stationName}>{train.from}</Text>
                </View>
                <Text style={styles.time}>{train.departure}</Text>
              </View>

              <View style={styles.durationBlock}>
                <Ionicons name="arrow-forward-outline" size={22} color="#FF79A8" />
                <View style={styles.durationPill}>
                  <Text style={styles.durationText}>{train.duration}</Text>
                </View>
              </View>

              <View style={styles.stationBlockRight}>
                <View style={styles.stationNameRowRight}>
                  <Text style={styles.stationName}>{train.to}</Text>
                  <View style={styles.pinkDot} />
                </View>
                <Text style={styles.timeRight}>{train.arrival}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.bottomRow}>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{train.price}</Text>

                {train.full && (
                  <View style={styles.fullBadge}>
                    <Text style={styles.fullBadgeText}>Complet</Text>
                  </View>
                )}
              </View>

              {!train.full && (
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Acheter</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#EFE7DF",
  },
  header: {
    paddingTop: 22,
    paddingHorizontal: 14,
    paddingBottom: 32,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  activeFilter: {
    backgroundColor: "#FFFFFF",
  },
  filterText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  activeFilterText: {
    color: "#C05A86",
    fontWeight: "700",
    fontSize: 12,
  },
  scroll: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 7,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stationBlock: {
    flex: 1.2,
  },
  stationBlockRight: {
    flex: 1.2,
    alignItems: "flex-end",
  },
  stationNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  stationNameRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
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
    fontWeight: "600",
  },
  time: {
    color: "#5D6673",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 17,
  },
  timeRight: {
    color: "#5D6673",
    fontSize: 12,
    marginTop: 8,
    marginRight: 17,
  },
  durationBlock: {
    alignItems: "center",
    flex: 0.6,
  },
  durationPill: {
    marginTop: 3,
    backgroundColor: "#FFE4EF",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  durationText: {
    color: "#D35A82",
    fontSize: 11,
    fontWeight: "700",
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
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    color: "#C75B82",
    fontSize: 20,
    fontWeight: "800",
  },
  fullBadge: {
    backgroundColor: "#E9EDF2",
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 12,
  },
  fullBadgeText: {
    color: "#4B5563",
    fontSize: 10,
    fontWeight: "700",
  },
  buyButton: {
    backgroundColor: "#F36F98",
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: "#F36F98",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});