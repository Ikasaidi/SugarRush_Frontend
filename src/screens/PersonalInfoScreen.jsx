import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

import styles from "../styles/profile";

export default function PersonalInfoScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  // Pré-remplissage
  const [nom, setNom] = useState(user?.lname || "");
  const [prenom, setPrenom] = useState(user?.fname || "");
  const [telephone, setTelephone] = useState(user?.phone || "");
  const [adresse, setAdresse] = useState(user?.address || "");

  // Email affiché mais non modifiable
  const email = user?.email || "";

  // Message stylé en bas
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const save = async () => {
    try {
      const res = await API.patch("/users/me", {
        fname: prenom,
        lname: nom,
        phone: telephone,
        address: adresse,
      });

      setUser(res.data);

      setIsError(false);
      setMessage("✔ Informations mises à jour avec succès !");
    } catch (err) {
      setIsError(true);
      setMessage("✖ Une erreur est survenue. Réessaie plus tard.");
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
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

        <Text style={styles.title}>Mon Profil</Text>
        <Text style={styles.subtitle}>Informations personnelles</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardClean}>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={16} color="#1a01019" />
            <TextInput
              placeholder="Nom"
              style={styles.inputText}
              value={nom}
              onChangeText={setNom}
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="person" size={16} color="#1a01019" />
            <TextInput
              placeholder="Prénom"
              style={styles.inputText}
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="call-outline" size={16} color="#1a0101" />
            <TextInput
              placeholder="Téléphone"
              style={styles.inputText}
              value={telephone}
              onChangeText={setTelephone}
            />
          </View>

          {/* EMAIL NON MODIFIABLE */}
          <View style={[styles.inputRow, { opacity: 0.5 }]}>
            <Ionicons name="mail-outline" size={16} color="#1a0101" />
            <TextInput
              placeholder="Email"
              style={styles.inputText}
              value={email}
              editable={false}
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={16} color="#1a0101" />
            <TextInput
              placeholder="Adresse"
              style={styles.inputText}
              value={adresse}
              onChangeText={setAdresse}
            />
          </View>
        </View>

        {/* MESSAGE STYLÉ */}
        {message !== "" && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 14,
              fontWeight: "600",
              color: isError ? "#ff4d6d" : "#EC6A8E",
            }}
          >
            {message}
          </Text>
        )}

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={save}>
            <LinearGradient
              colors={["#FF8FB3", "#EC6A8E"]}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Enregistrer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
