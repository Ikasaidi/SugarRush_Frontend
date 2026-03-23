import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/profile";

export default function PaymentScreen() {
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState("");

  const addCard = () => {
    if (cardNumber !== "") {
      setCards([...cards, cardNumber]);
      setCardNumber("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Moyens de paiement</Text>

      <TextInput
        placeholder="Numéro de carte"
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TouchableOpacity style={styles.addButton} onPress={addCard}>
        <Text style={{ color: "#fff" }}>Ajouter</Text>
      </TouchableOpacity>

      {cards.map((card, index) => (
        <Text key={index}>💳 {card}</Text>
      ))}
    </View>
  );
}