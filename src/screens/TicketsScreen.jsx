import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ticket.js";
import AuthContext from "../context/AuthContext";

export default function TicketsScreen() {
  const { user } = useContext(AuthContext);

  const freeTickets = user?.wallet?.free_ticket_balance || 0;
  const paidTickets = user?.wallet?.paid_ticket_balance || 0;
  const totalSpent = user?.stats?.total_spent || 0;

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={["#C05A86", "#FF79A8"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Mes billets</Text>
        <Text style={styles.subtitleTickets}>{freeTickets} billet{freeTickets > 1 ? "s" : ""} disponible{freeTickets > 1 ? "s" : ""} • {paidTickets} payé{paidTickets > 1 ? "s" : ""}</Text>
      </LinearGradient>

      <View style={styles.ticketCard}>

        <Ionicons name="ticket-outline" size={40} color="#C7C7C7" />

        <Text style={styles.ticketTitle}>
          {freeTickets > 0 ? `${freeTickets} billet${freeTickets > 1 ? "s" : ""}` : "Aucun billet pour le moment"}
        </Text>

        <Text style={{ marginTop: 8, color: "#777" }}>Billets payés : {paidTickets}</Text>

        <Text style={{ marginTop: 8, color: "#777" }}>Total dépensé : {Number(totalSpent).toFixed(2)}€</Text>

        <Text style={styles.ticketSubtitle}>
          Achetez vos premiers billets dans l'onglet Horaires
        </Text>

      </View>

    </View>
  );
}