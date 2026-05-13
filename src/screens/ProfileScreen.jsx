import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/profile";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={40} color="#EC6A8E" />
        </View>

        {/* 🔥 Infos du user */}
        {/* 🔥 USER INFO CARD — STYLE PREMIUM */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 15,
            paddingVertical: 18,
            paddingHorizontal: 80,
            borderRadius: 20,
            backgroundColor: "rgba(255, 143, 179, 0.20)", // rose translucide
            borderWidth: 1,
            borderColor: "rgba(255, 143, 179, 0.35)",
            shadowColor: "#EC6A8E",
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {/* Nom complet */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Ionicons name="person-circle-outline" size={26} color="#EC6A8E" />
            <Text
              style={{
                marginLeft: 12,
                fontSize: 17,
                fontWeight: "700",
                color: "#2a2a2a",
              }}
            >
              {user?.fname} {user?.lname}
            </Text>
          </View>

          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Ionicons name="mail-outline" size={22} color="#EC6A8E" />
            <Text style={{ marginLeft: 12, fontSize: 15, color: "#444" }}>
              {user?.email}
            </Text>
          </View>

          {/* Téléphone */}
          {user?.phone ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Ionicons name="call-outline" size={22} color="#EC6A8E" />
              <Text style={{ marginLeft: 12, fontSize: 15, color: "#444" }}>
                {user.phone}
              </Text>
            </View>
          ) : null}

          {/* Adresse */}
          {user?.address ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={22} color="#EC6A8E" />
              <Text style={{ marginLeft: 12, fontSize: 15, color: "#444" }}>
                {user.address}
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.qrCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("My QR")}
        >
          <View style={styles.qrLeft}>
            <Ionicons name="qr-code-outline" size={22} color="#EC6A8E" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.qrTitle}>Mon QR Code</Text>
            <Text style={styles.qrSubtitle}>Afficher mon code personnel</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </LinearGradient>

      {/* WALLET */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet-outline" size={20} color="#EC6A8E" />
          <Text style={styles.cardTitle}>Mon portefeuille</Text>
        </View>

        <View style={styles.walletRow}>
          <View style={[styles.ticketBox, styles.freeBox]}>
            <Text style={styles.ticketLabel}>Billets gratuits</Text>
            <Text style={styles.ticketNumber}>2</Text>
          </View>

          <View style={[styles.ticketBox, styles.paidBox]}>
            <Text style={styles.ticketLabel}>Billets payés</Text>
            <Text style={styles.ticketNumber}>0</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total dépensé</Text>
          <Text style={styles.totalAmount}>0.00€</Text>
        </View>
      </View>

      {/* HISTORY */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={20} color="#EC6A8E" />
          <Text style={styles.cardTitle}>Historique des achats</Text>
        </View>

        <Text style={styles.emptyText}>Aucun achat pour le moment</Text>
      </View>

      {/* SETTINGS */}
      <View style={styles.card}>
        <Text style={styles.settingsTitle}>Paramètres du compte</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name="person-outline" size={18} color="#EC6A8E" />
            </View>
            <Text style={styles.settingText}>Informations personnelles</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Notifications")}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name="mail-outline" size={18} color="#EC6A8E" />
            </View>
            <Text style={styles.settingText}>Email et notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Payment")}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name="card-outline" size={18} color="#EC6A8E" />
            </View>
            <Text style={styles.settingText}>Moyens de paiement</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        {/* ADMIN PANEL */}
        {/* {user?.user_type === "admin" && ( */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("AdminPanel")}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name="speedometer-outline" size={18} color="#EC6A8E" />
            </View>
            <Text style={styles.settingText}>Admin</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
        {/* )} */}
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
