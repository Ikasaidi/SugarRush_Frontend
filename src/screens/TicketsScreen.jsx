import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ticket.js";
import { useCards } from "../context/CardContext";
import API from "../services/api";
import AuthContext from "../context/AuthContext";
import { formatCAD } from "../utils/currency";

const ticketTypes = [
  {
    id: "standard",
    title: "Standard",
    subtitle: "Billet régulier pour un trajet",
    price: 34.25,
    color: "#C8DDB5",
  },
];

export default function TicketsScreen({ navigation }) {
  const { cards } = useCards();
  const { refreshUser } = useContext(AuthContext);

  const [loadingBuy, setLoadingBuy] = useState(false);

  const [selectedTicket] = useState(ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toast, setToast] = useState(null);

  const total = selectedTicket.price * quantity;

  const showToast = (message, type = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleBuy = async () => {
    if (cards.length === 0) {
      navigation.navigate("Payment");
      return;
    }

    if (!selectedCard) {
      showToast(
        "Choisissez une carte pour payer.",
        "warning"
      );
      return;
    }

    try {
      setLoadingBuy(true);

      const res = await API.post("/purchases/purchase", {
        quantity,
        unit_price: selectedTicket.price,
        currency: "CAD",
      });

      console.log("PURCHASE RESPONSE:", res?.data);

      showToast(
        `${quantity} billet(s) acheté(s) avec succès.`,
        "success"
      );

      setQuantity(1);

      // refresh user to update wallet/purchases
      if (typeof refreshUser === "function") await refreshUser();

    } catch (error) {
      console.log("PURCHASE ERROR:", error?.response?.data || error.message);
      showToast("Erreur lors de l'achat. Réessaie plus tard.", "error");
    } finally {
      setLoadingBuy(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#C05A86", "#FF79A8"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Achat de billets</Text>
        <Text style={styles.subtitleTickets}>
          Achetez vos billets avant votre passage
        </Text>
      </LinearGradient>

      <View style={styles.ticketPreviewCard}>
        <View style={styles.ticketIconBox}>
          <Ionicons name="ticket-outline" size={28} color="#C05A86" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.ticketPreviewTitle}>Billet Sugar-Pi</Text>
          <Text style={styles.ticketPreviewText}>
            Valide pour un trajet entre les stations Bubblegum et Candy Cloud.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Type de billet</Text>

      {ticketTypes.map((ticket) => (
        <TouchableOpacity
          key={ticket.id}
          style={[styles.optionCard, styles.selectedCard]}
          activeOpacity={0.85}
        >
          <View style={[styles.circle, { backgroundColor: ticket.color }]}>
            <Ionicons name="checkmark" size={18} color="white" />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.optionTitle}>{ticket.title}</Text>
            <Text style={styles.optionSubtitle}>{ticket.subtitle}</Text>
          </View>

          <Text style={styles.optionPrice}>{formatCAD(ticket.price)}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Ionicons name="time-outline" size={20} color="#D85C8A" />
          <Text style={styles.infoTitle}>Utilisation</Text>
          <Text style={styles.infoText}>Valide pour 1 trajet </Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="qr-code-outline" size={20} color="#D85C8A" />
          <Text style={styles.infoTitle}>Accès</Text>
          <Text style={styles.infoText}>Scan à l'entrée de Candy Cloud</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <View>
          <Text style={styles.quantityLabel}>Quantité</Text>
          <Text style={styles.quantitySubLabel}>Maximum 10 billets</Text>
        </View>

        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity === 1 && styles.quantityButtonDisabled,
            ]}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="remove" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.quantityMiddle}>
            <Text style={styles.quantityValue}>{quantity}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              quantity === 10 && styles.quantityButtonDisabled,
            ]}
            onPress={() => quantity < 10 && setQuantity(quantity + 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.totalCard}>
        <View>
          <Text style={styles.totalLabel}>Total à payer</Text>
          <Text style={styles.totalSubLabel}>
            {quantity} × {formatCAD(selectedTicket.price)}
          </Text>
        </View>

        <Text style={styles.totalPrice}>{formatCAD(total)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Mode de paiement</Text>

      {cards.length === 0 ? (
        <TouchableOpacity
          style={styles.noCardBox}
          onPress={() => navigation.navigate("Payment")}
          activeOpacity={0.85}
        >
          <View style={styles.noCardIconBox}>
            <Ionicons name="card-outline" size={22} color="#D85C8A" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.noCardTitle}>Aucune carte enregistrée</Text>
            <Text style={styles.noCardText}>
              Touchez ici pour ajouter une carte.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#D85C8A" />
        </TouchableOpacity>
      ) : (
        cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.paymentCard,
              selectedCard?.id === card.id && styles.selectedPaymentCard,
            ]}
            onPress={() => setSelectedCard(card)}
            activeOpacity={0.85}
          >
            <View style={styles.paymentIconBox}>
              <Ionicons name="card" size={22} color="#D85C8A" />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.paymentCardNumber}>
                Carte •••• {card.number.replace(/\D/g, "").slice(-4)}
              </Text>

              <Text style={styles.paymentCardName}>{card.name}</Text>
            </View>

            {selectedCard?.id === card.id && (
              <Ionicons
                style={styles.paymentCheck}
                name="checkmark-circle"
                size={24}
                color="#7DBA89"
              />
            )}
          </TouchableOpacity>
        ))
      )}

      <TouchableOpacity
        style={[
          styles.payButton,
          cards.length > 0 && !selectedCard && { opacity: 0.55 },
        ]}
        onPress={handleBuy}
        activeOpacity={0.85}
      >
        <Ionicons name="card-outline" size={16} color="#0D2B3E" />
        <Text style={styles.payText}>Payer {formatCAD(total)}</Text>
      </TouchableOpacity>


      {toast && (
        <View
          style={[
            styles.toastBox,
            toast.type === "success" &&
              styles.toastSuccess,

            toast.type === "warning" &&
              styles.toastWarning,
          ]}
        >
          <Ionicons
            name={
              toast.type === "success"
                ? "checkmark-circle"
                : "alert-circle"
            }
            size={18}
            color="#fff"
          />

          <Text style={styles.toastText}>
            {toast.message}
          </Text>
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}