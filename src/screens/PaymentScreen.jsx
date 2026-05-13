import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/profile";
import { useCards } from "../context/CardContext";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const { cards, addCard, deleteCard } = useCards();

  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const maskCardNumber = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, "");
    return `•••• •••• •••• ${digits.slice(-4)}`;
  };

  const handleAddCard = () => {
    if (!number || !name || !expiry || !cvv) {
      Alert.alert("Erreur", "Remplis tous les champs.");
      return;
    }

    if (number.replace(/\D/g, "").length !== 16) {
      Alert.alert("Erreur", "Le numéro doit avoir 16 chiffres.");
      return;
    }

    if (expiry.replace(/\D/g, "").length !== 4) {
      Alert.alert("Erreur", "La date doit être au format MM/AA.");
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert("Erreur", "Le CVV doit avoir 3 chiffres.");
      return;
    }

    addCard({
      id: Date.now().toString(),
      number,
      name: name.toUpperCase(),
      expiry,
      cvv,
    });

    setNumber("");
    setName("");
    setExpiry("");
    setCvv("");
    setModalVisible(false);
  };

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

        <Text style={styles.title}>Paiement</Text>
        <Text style={styles.subtitle}>Méthodes enregistrées</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity key={card.id} onLongPress={() => deleteCard(index)}>
            <LinearGradient
              colors={["#D94F87", "#F777A6", "#FF9FC0"]}
              style={styles.bankCardGradient}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardBrand}>VISA</Text>
                <Ionicons name="wifi" size={22} color="#fff" />
              </View>

              <View style={styles.chip} />

              <Text style={styles.cardNumber}>
                {maskCardNumber(card.number)}
              </Text>

              <View style={styles.cardBottom}>
                <View>
                  <Text style={styles.cardLabel}>CARD HOLDER</Text>
                  <Text style={styles.cardName}>{card.name}</Text>
                </View>

                <View>
                  <Text style={styles.cardLabel}>EXPIRES</Text>
                  <Text style={styles.cardName}>{card.expiry}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={18} color="#333" />
          <Text style={styles.addText}>Ajouter une carte</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nouvelle carte</Text>

            <TextInput
              placeholder="Numéro de carte"
              style={styles.input}
              value={number}
              onChangeText={(text) => setNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />

            <TextInput
              placeholder="Nom sur la carte"
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="characters"
            />

            <TextInput
              placeholder="MM/AA"
              style={styles.input}
              value={expiry}
              onChangeText={(text) => setExpiry(formatExpiry(text))}
              keyboardType="numeric"
              maxLength={5}
            />

            <TextInput
              placeholder="CVV"
              style={styles.input}
              value={cvv}
              onChangeText={(text) =>
                setCvv(text.replace(/\D/g, "").slice(0, 3))
              }
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />

            <TouchableOpacity onPress={handleAddCard}>
              <LinearGradient
                colors={["#FF8FB3", "#EC6A8E"]}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>Ajouter</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, textAlign: "center" }}>
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}