import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/qr";
import API from "../services/api";
import AuthContext from "../context/AuthContext"; 

export default function QRScreen() {
  const { user } = useContext(AuthContext);
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQrCode = async (forceRefresh = false) => {
    if (qrUrl && !forceRefresh) return;

    try {
      setLoading(true);

      const response = await API.post("/qr-code/generate", {
        user_id: user.id,
      });

      setQrUrl(response.data.qr_code.qr_url);
    } catch (error) {
      console.log("QR generation error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshQrCode = () => {
    setQrUrl(null);
    generateQrCode(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#C05A86", "#FF79A8"]}
        style={styles.headerTickets}
      >
        <Text style={styles.titleTickets}>QR CODE</Text>
        <Text style={styles.subtitleTickets}>
          Présentez ce code au ChibiScan
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: 120, flexGrow: 1 },
        ]}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.qrCardContainer}>
          <LinearGradient
            colors={["#EC6A8E", "#FF8FB3"]}
            style={styles.qrHeader}
          >
            <View style={styles.qrAvatar}>
              <Ionicons name="person-outline" size={20} color="#EC6A8E" />
            </View>
            {/* changer au nom  de l'id*/}
            <Text style={styles.qrUser}>{user?.username || "Utilisateur"}</Text>
          </LinearGradient>


          <TouchableOpacity
            style={styles.qrBox}
            activeOpacity={0.8}
            onPress={() => generateQrCode(false)}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#EC6A8E" />
            ) : qrUrl ? (
              <Image
                source={{ uri: qrUrl }}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
              />
            ) : (
              <Ionicons name="qr-code-outline" size={140} color="#EC6A8E" />
            )}
          </TouchableOpacity>

          <Text style={{ marginTop: 10, color: "#777", textAlign: "center" }}>
            {qrUrl
              ? "QR généré. Présentez-le au ChibiScan."
              : "Touchez le carré pour générer votre QR."}
          </Text>

          {qrUrl && (
            <TouchableOpacity
              onPress={refreshQrCode}
              activeOpacity={0.8}
              style={{
                marginTop: 16,
                paddingVertical: 10,
                paddingHorizontal: 18,
                borderRadius: 20,
                marginBottom: 20,
                backgroundColor: "#EC6A8E",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Régénérer le QR
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.qrInfoBox}>
            <Text style={styles.qrInfoTitle}>Comment l'utiliser ?</Text>

            <Text style={styles.qrInfoText}>
              1. Présentez ce QR code au ChibiScan
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