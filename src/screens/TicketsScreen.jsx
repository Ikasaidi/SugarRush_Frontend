import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ticket.js";

const ticketTypes = [
  {
    id: "standard",
    title: "Standard",
    subtitle: "Billet standard",
    price: 34.25,
    color: "#C8DDB5",
  },
  {
    id: "premium",
    title: "Premium",
    subtitle: "Billet premium",
    price: 62.75,
    color: "#FF7FA3",
  },
  {
    id: "first",
    title: "Première Classe",
    subtitle: "Billet première classe",
    price:  104.50,
    color: "#B85D83",
  },
];

export default function TicketsScreen({ navigation }) {
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [tickets, setTickets] = useState([]);

  const total = selectedTicket.price * quantity;

  const handleBuy = () => {
    const newTicket = {
      id: Date.now().toString(),
      type: selectedTicket.title,
      total,
      departure: "Bubblegum",
      arrival: "Candyland",
      date: "12/05/2026 - 08:30",
      status: "Valide",
    };

    setTickets([...tickets, newTicket]);
  };

  return (
    <ScrollView style={styles.container}>

      <LinearGradient
        colors={["#C05A86", "#FF79A8"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Mes billets</Text>

        <Text style={styles.subtitleTickets}>
          {tickets.length} billet disponible
        </Text>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Type de billet</Text>

      {ticketTypes.map((ticket) => (
        <TouchableOpacity
          key={ticket.id}
          style={[
            styles.optionCard,
            selectedTicket.id === ticket.id && styles.selectedCard,
          ]}
          onPress={() => setSelectedTicket(ticket)}
        >
          <View
            style={[
              styles.circle,
              { backgroundColor: ticket.color },
            ]}
          >
            {selectedTicket.id === ticket.id && (
              <Ionicons name="checkmark" size={18} color="white" />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.optionTitle}>{ticket.title}</Text>
            <Text style={styles.optionSubtitle}>
              {ticket.subtitle}
            </Text>
          </View>

          <Text style={styles.optionPrice}>
            {ticket.price.toFixed(2)}$
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.quantityCard}>
        <Text style={styles.sectionTitle}>Quantité</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total</Text>

        <Text style={styles.totalPrice}>
          {total.toFixed(2)}$
        </Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={handleBuy}
      >
        <Ionicons
          name="card-outline"
          size={16}
          color="#0D2B3E"
        />

        <Text style={styles.payText}>
          Payer {total.toFixed(2)}$
        </Text>
      </TouchableOpacity>

      {tickets.length === 0 ? (
        <View style={styles.ticketCard}>
          <Ionicons
            name="ticket-outline"
            size={40}
            color="#C7C7C7"
          />

          <Text style={styles.ticketTitle}>
            Aucun billet pour le moment
          </Text>

          <Text style={styles.ticketSubtitle}>
            Achetez vos premiers billets dans l'onglet Horaires
          </Text>
        </View>
      ) : (
        tickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.realTicket}
            onPress={() =>
              navigation.navigate("My QR", {
                ticket,
              })
            }
          >
            <View style={styles.validBar}>
              <Text style={styles.validText}>
                ✓ {ticket.status}
              </Text>
            </View>

            <View style={styles.ticketContent}>
              <View>
                <Text style={styles.smallLabel}>Départ</Text>

                <Text style={styles.boldText}>
                  {ticket.departure}
                </Text>
              </View>

              <Ionicons
                name="ticket"
                size={28}
                color="#D85C8A"
              />

              <View>
                <Text style={styles.smallLabel}>Arrivée</Text>

                <Text style={styles.boldText}>
                  {ticket.arrival}
                </Text>
              </View>
            </View>

            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.smallLabel}>
                  Date & Heure
                </Text>

                <Text style={styles.boldText}>
                  {ticket.date}
                </Text>
              </View>

              <View>
                <Text style={styles.smallLabel}>Type</Text>

                <Text style={styles.typeText}>
                  {ticket.type}
                </Text>
              </View>
            </View>

            <View style={styles.qrRow}>
              <Ionicons
                name="qr-code-outline"
                size={16}
                color="#FF6F9F"
              />

              <Text style={styles.qrText}>
                Appuyez pour voir le QR code
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}