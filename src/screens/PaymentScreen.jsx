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
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

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

    let month = digits.slice(0, 2);
    const year = digits.slice(2);

    if (month.length === 1) {
      const monthNum = parseInt(month, 10);
      if (monthNum > 1) month = `0${monthNum}`;
    }

    if (month.length === 2) {
      const monthNum = parseInt(month, 10);
      if (monthNum < 1) month = "01";
      if (monthNum > 12) month = "12";
    }

    if (digits.length >= 3) return `${month}/${year}`;

    return month;
  };

  const isExpiryValid = () => {
    const [month, year] = expiry.split("/");
    if (!month || !year) return false;

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum < currentMonth) return false;

    return true;
  };

  const maskCardNumber = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, "");
    return `•••• •••• •••• ${digits.slice(-4)}`;
  };

  const resetForm = () => {
    setNumber("");
    setName("");
    setExpiry("");
    setCvv("");
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

    if (name.trim().length < 3) {
      Alert.alert("Erreur", "Le nom doit contenir au moins 3 caractères.");
      return;
    }

    if (!isExpiryValid()) {
      Alert.alert("Erreur", "La date d’expiration est invalide ou expirée.");
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert("Erreur", "Le CVV doit avoir 3 chiffres.");
      return;
    }

    const alreadyExists = cards.some(
      (card) =>
        card.number.replace(/\D/g, "") === number.replace(/\D/g, "")
    );

    if (alreadyExists) {
      Alert.alert("Carte existante", "Cette carte est déjà enregistrée.");
      return;
    }

    addCard({
      id: Date.now().toString(),
      number,
      name: name.toUpperCase(),
      expiry,
      cvv,
    });

    resetForm();
    setModalVisible(false);
  };

  const openDeleteModal = (index) => {
    setCardToDelete(index);
    setDeleteModalVisible(true);
  };

  const handleDeleteCard = () => {
    if (cardToDelete !== null) {
      deleteCard(cardToDelete);
    }

    setCardToDelete(null);
    setDeleteModalVisible(false);
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
        {cards.length === 0 ? (
          <View style={styles.emptyPaymentBox}>
            <View style={styles.emptyPaymentIcon}>
              <Ionicons name="card-outline" size={34} color="#D85C8A" />
            </View>

            <Text style={styles.emptyPaymentTitle}>Aucune carte</Text>
            <Text style={styles.emptyPaymentText}>
              Ajoutez une carte pour acheter vos billets.
            </Text>
          </View>
        ) : (
          cards.map((card, index) => (
            <TouchableOpacity key={card.id} activeOpacity={0.95}>
              <LinearGradient
                colors={["#D94F87", "#F777A6", "#FF9FC0"]}
                style={styles.bankCardGradient}
              >
                <View style={styles.cardTop}>
                  <Text style={styles.cardBrand}>VISA</Text>

                  <Ionicons name="wifi" size={22} color="#fff" />

                  <TouchableOpacity
                    style={styles.deleteCardButton}
                    onPress={() => openDeleteModal(index)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="trash-outline" size={16} color="#fff" />
                  </TouchableOpacity>
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
          ))
        )}

        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={18} color="#333" />
          <Text style={styles.addText}>Ajouter une carte</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nouvelle carte</Text>
            <Text style={styles.modalSubtitle}>
              Entrez les informations de votre carte
            </Text>

            <TextInput
              placeholder="Numéro de carte"
              placeholderTextColor="#B88A98"
              style={[styles.input, styles.inputOutlined]}
              value={number}
              onChangeText={(text) => setNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />

            <TextInput
              placeholder="Nom sur la carte"
              placeholderTextColor="#B88A98"
              style={[styles.input, styles.inputOutlined]}
              value={name}
              onChangeText={setName}
              autoCapitalize="characters"
            />

            <View style={styles.formRow}>
              <TextInput
                placeholder="MM/AA"
                placeholderTextColor="#B88A98"
                style={[styles.input, styles.inputOutlined, styles.halfInput]}
                value={expiry}
                onChangeText={(text) => setExpiry(formatExpiry(text))}
                keyboardType="numeric"
                maxLength={5}
              />

              <TextInput
                placeholder="CVV"
                placeholderTextColor="#B88A98"
                style={[styles.input, styles.inputOutlined, styles.halfInput]}
                value={cvv}
                onChangeText={(text) =>
                  setCvv(text.replace(/\D/g, "").slice(0, 3))
                }
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>

            <TouchableOpacity onPress={handleAddCard} activeOpacity={0.85}>
              <LinearGradient
                colors={["#FF8FB3", "#EC6A8E"]}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>Ajouter</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                resetForm();
                setModalVisible(false);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.deleteModalOverlay}>
          <View style={styles.deleteModalCard}>
            <View style={styles.deleteIconBox}>
              <Ionicons name="trash-outline" size={28} color="#D85C8A" />
            </View>

            <Text style={styles.deleteModalTitle}>Supprimer la carte ?</Text>

            <Text style={styles.deleteModalText}>
              Cette carte sera retirée de vos méthodes de paiement.
            </Text>

            <View style={styles.deleteModalActions}>
              <TouchableOpacity
                style={styles.deleteCancelButton}
                onPress={() => {
                  setCardToDelete(null);
                  setDeleteModalVisible(false);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.deleteCancelText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteConfirmButton}
                onPress={handleDeleteCard}
                activeOpacity={0.85}
              >
                <Text style={styles.deleteConfirmText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}