import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/profile";

export default function PaymentScreen() {
  const navigation = useNavigation();

  const [cards, setCards] = useState([
    { number: "4242 4242 4242 4242", name: "Aya Issa" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  // ➕ Ajouter carte
  const addCard = () => {
    if (number && name) {
      setCards([...cards, { number, name }]);
      setNumber("");
      setName("");
      setModalVisible(false);
    }
  };

  // ❌ Supprimer carte
  const deleteCard = (index) => {
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
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

        {/* CARTES */}
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => deleteCard(index)} // 🔥 suppression
          >
            <View style={styles.bankCard}>
              <LinearGradient
                colors={["#EC6A8E", "#FF8FB3"]}
                style={styles.bankCardGradient}
              >
                <Text style={styles.cardBrand}>VISA</Text>

                <Text style={styles.cardNumber}>
                  {card.number}
                </Text>

                <View style={styles.cardBottom}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Ionicons name="card" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={18} color="#333" />
          <Text style={styles.addText}>Ajouter une carte</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>Nouvelle carte</Text>

            <TextInput
              placeholder="Numéro de carte"
              style={styles.input}
              value={number}
              onChangeText={setNumber}
            />

            <TextInput
              placeholder="Nom"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TouchableOpacity onPress={addCard}>
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