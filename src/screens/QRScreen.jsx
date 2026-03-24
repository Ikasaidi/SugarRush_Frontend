import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/qr";

export default function QRScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={["#FF8FB3", "#EC6A8E"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>Mon QR Code</Text>
        <Text style={styles.subtitleTickets}>
          Présentez ce code au contrôleur
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.qrCardContainer}>

          <LinearGradient
            colors={["#EC6A8E", "#FF8FB3"]}
            style={styles.qrHeader}
          >
            <View style={styles.qrAvatar}>
              <Ionicons name="person-outline" size={20} color="#EC6A8E" />
            </View>
            <Text style={styles.qrUser}>Utilisateur Candy Train</Text>
          </LinearGradient>


          <TouchableOpacity
            style={styles.qrBox}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="qr-code-outline" size={140} color="#EC6A8E" />
          </TouchableOpacity>


          <View style={styles.qrIdBox}>
            <Text style={styles.qrIdLabel}>ID Utilisateur</Text>
            <Text style={styles.qrId}>USR-P99JKNWSS</Text>
          </View>


          <View style={styles.verifiedBox}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#fff" />
            <Text style={styles.verifiedText}>Compte vérifié</Text>
          </View>

          <View style={styles.qrInfoBox}>
            <Text style={styles.qrInfoTitle}>Comment l'utiliser ?</Text>

            <Text style={styles.qrInfoText}>
              1. Présentez ce QR code au contrôleur
            </Text>
            <Text style={styles.qrInfoText}>
              2. Il sera scanné pour vérifier votre identité
            </Text>
            <Text style={styles.qrInfoText}>
              3. Assurez-vous d’avoir un billet valide
            </Text>
          </View>

        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            💡 Astuce : Vous pouvez aussi accéder à votre QR code depuis votre profil
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}