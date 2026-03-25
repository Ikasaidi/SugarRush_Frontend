import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/schedule";

const DATA = [
  {
    from: "Paris Gare de Lyon",
    to: "Lyon Part-Dieu",
    depart: "08:30",
    arrive: "10:30",
    duration: "2h00",
    price: "45€",
    available: true,
    today: true,
  },
  {
    from: "Paris Montparnasse",
    to: "Bordeaux St-Jean",
    depart: "09:15",
    arrive: "11:30",
    duration: "2h15",
    price: "52€",
    available: true,
    today: true,
  },
  {
    from: "Marseille St-Charles",
    to: "Nice Ville",
    depart: "10:00",
    arrive: "12:30",
    duration: "2h30",
    price: "38€",
    available: true,
    today: false,
  },
  {
    from: "Lille Europe",
    to: "Paris Nord",
    depart: "11:45",
    arrive: "12:45",
    duration: "1h00",
    price: "35€",
    available: false,
    today: true,
  },
];

export default function ScheduleScreen() {

  const [filter, setFilter] = useState("all");

  const filteredData = DATA.filter((item) => {
    if (filter === "today") return item.today;
    if (filter === "available") return item.available;
    return true;
  });

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={["#FF8FB3", "#EC6A8E"]}
        style={styles.header}
      >
        <Text style={styles.title}>Horaires des trains</Text>

        {/* FILTRES */}
        <View style={styles.filters}>

          <TouchableOpacity
            onPress={() => setFilter("all")}
            style={[
              styles.filterBtn,
              filter === "all" && styles.filterActive,
            ]}
          >
            <Text style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive
            ]}>
              Tous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilter("today")}
            style={[
              styles.filterBtn,
              filter === "today" && styles.filterActive,
            ]}
          >
            <Text style={[
              styles.filterText,
              filter === "today" && styles.filterTextActive
            ]}>
              Aujourd’hui
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilter("available")}
            style={[
              styles.filterBtn,
              filter === "available" && styles.filterActive,
            ]}
          >
            <Text style={[
              styles.filterText,
              filter === "available" && styles.filterTextActive
            ]}>
              Disponibles
            </Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>

      <LinearGradient
        colors={["#F2F2F2", "#CFE5C5"]}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={{ padding: 15 }}
          showsVerticalScrollIndicator={false}
        >

          {filteredData.map((item, index) => (
            <View key={index} style={styles.card}>

              <View style={styles.row}>

                <View style={styles.side}>
                  <View style={styles.dotGreen} />
                  <Text style={styles.station}>{item.from}</Text>
                  <Text style={styles.time}>{item.depart}</Text>
                </View>

                <View style={styles.center}>
                  <Ionicons name="arrow-forward" size={16} color="#EC6A8E" />
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>

                <View style={[styles.side, { alignItems: "flex-end" }]}>
                  <Text style={styles.station}>{item.to}</Text>
                  <Text style={styles.time}>{item.arrive}</Text>
                  <View style={styles.dotPink} />
                </View>

              </View>

              <View style={styles.bottom}>
                <Text style={styles.price}>{item.price}</Text>

                {item.available ? (
                  <TouchableOpacity style={styles.buyBtn}>
                    <Text style={styles.buyText}>Acheter</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.full}>Complet</Text>
                )}
              </View>

            </View>
          ))}

        </ScrollView>
      </LinearGradient>

    </View>
  );
}