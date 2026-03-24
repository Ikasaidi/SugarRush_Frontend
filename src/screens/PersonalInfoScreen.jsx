import React, { useState } from "react";
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

import styles from "../styles/profile";

export default function PersonalInfoScreen() {
  const navigation = useNavigation();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");

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

          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={16} color="#1a0101" />
            <TextInput
              placeholder="Email"
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
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

        <View style={styles.btnContainer}>
          <TouchableOpacity>
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