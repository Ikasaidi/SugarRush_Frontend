import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/profile";

export default function AdminPanelScreen() {
  const navigation = useNavigation();

  const startServer = () => {
    console.log("Start server triggered");
    // API.post("/iot/server/start")
  };

  const manualDeparture = () => {
    console.log("Manual train departure triggered");
    // API.post("/iot/train/manual")
  };

  const heartButton = (label, icon, onPress) => (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 25 }}>
      <LinearGradient
        colors={["#FF8FB3", "#EC6A8E"]}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#EC6A8E",
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Ionicons name={icon} size={40} color="#fff" />
      </LinearGradient>

      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          fontSize: 16,
          fontWeight: "600",
          color: "#EC6A8E",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF8FB3", "#EC6A8E"]}
        style={styles.headerClean}
      >
        <TouchableOpacity
          style={styles.backButtonClean}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Admin Panel</Text>
        <Text style={styles.subtitle}>Contrôles avancés</Text>
      </LinearGradient>

      <View
        style={{
          padding: 20,
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {/* ❤️ Start Server */}
        {heartButton("Start Server", "heart-outline", startServer)}

        {/* 💗 Manual Train Departure */}
        {heartButton("Manual Departure", "train-outline", manualDeparture)}
      </View>
    </View>
  );
}
