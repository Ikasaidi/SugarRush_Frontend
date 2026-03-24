import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ticket.js";

export default function TicketsScreen() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <LinearGradient
        colors={["#FF8FB3", "#EC6A8E"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Mes billets</Text>
        <Text style={styles.subtitleTickets}>0 billet disponible</Text>
      </LinearGradient>

      {/* EMPTY STATE */}
      <View style={styles.ticketCard}>

        <Ionicons name="ticket-outline" size={40} color="#C7C7C7" />

        <Text style={styles.ticketTitle}>
          Aucun billet pour le moment
        </Text>

        <Text style={styles.ticketSubtitle}>
          Achetez vos premiers billets dans l'onglet Horaires
        </Text>

      </View>

    </View>
  );
}