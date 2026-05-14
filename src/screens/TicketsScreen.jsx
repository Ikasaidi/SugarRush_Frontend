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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#C05A86", "#FF79A8"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Mes billets</Text>
        <Text style={styles.subtitleTickets}>{freeTickets} billet{freeTickets > 1 ? "s" : ""} disponible{freeTickets > 1 ? "s" : ""} • {paidTickets} payé{paidTickets > 1 ? "s" : ""}</Text>
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

        <Text style={styles.ticketTitle}>
          {freeTickets > 0 ? `${freeTickets} billet${freeTickets > 1 ? "s" : ""}` : "Aucun billet pour le moment"}
        </Text>

        <Text style={{ marginTop: 8, color: "#777" }}>Billets payés : {paidTickets}</Text>

        <Text style={{ marginTop: 8, color: "#777" }}>Total dépensé : {Number(totalSpent).toFixed(2)}€</Text>

        <Text style={styles.ticketSubtitle}>
          Achetez vos premiers billets dans l'onglet Horaires
        </Text>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.optionTitle}>{ticket.title}</Text>
            <Text style={styles.optionSubtitle}>{ticket.subtitle}</Text>
          </View>

          <Text style={styles.optionPrice}>{ticket.price.toFixed(2)}$</Text>
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
            {quantity} × {selectedTicket.price.toFixed(2)}$
          </Text>
        </View>

        <Text style={styles.totalPrice}>{total.toFixed(2)}$</Text>
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
        <Text style={styles.payText}>Payer {total.toFixed(2)}$</Text>
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