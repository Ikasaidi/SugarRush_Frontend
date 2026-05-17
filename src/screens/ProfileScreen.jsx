// screens/ProfileScreen.tsx

import React, { useContext, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import styles from "../styles/profile";

export default function ProfileScreen() {
  const { user, logout, refreshUser } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);

      console.log("ProfileScreen: handleRefresh triggered");

      await refreshUser?.();

      console.log("ProfileScreen: refreshUser completed");
    } catch (err) {
      console.log("ProfileScreen: refresh error", err);
    } finally {
      setRefreshing(false);
    }
  }, [refreshUser]);

  const navigation = useNavigation();
  const isAdmin = user?.user_type === "admin";
  const purchases = user?.purchases || [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 40,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#EC6A8E"]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={40} color="#EC6A8E" />
        </View>

        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff", marginTop: 8 }}>
          {user?.fname} {user?.lname}
        </Text>

        <Text style={styles.email}>{user?.email || "Utilisateur"}</Text>

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

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet-outline" size={20} color="#EC6A8E" />
          <Text style={styles.cardTitle}>Mon portefeuille</Text>
        </View>

        <TouchableOpacity
          onPress={handleRefresh}
          activeOpacity={0.85}
          style={{
            alignSelf: "flex-start",
            marginBottom: 14,
            paddingHorizontal: 14,
            paddingVertical: 9,
            backgroundColor: "#EC6A8E",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 4,
          }}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="refresh-outline" size={18} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 8, fontWeight: "700" }}>
                Rafraîchir
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.walletRow}>
          <View style={[styles.ticketBox, styles.freeBox]}>
            <Text style={styles.ticketLabel}>Billets gratuits</Text>
            <Text style={styles.ticketNumber}>{user?.wallet?.free_ticket_balance || 0}</Text>
          </View>

          <View style={[styles.ticketBox, styles.paidBox]}>
            <Text style={styles.ticketLabel}>Billets payés</Text>
            <Text style={styles.ticketNumber}>{user?.wallet?.paid_ticket_balance || 0}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total dépensé</Text>
          <Text style={styles.totalAmount}>{(user?.stats?.total_spent || 0).toFixed(2)}€</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={20} color="#EC6A8E" />
          <Text style={styles.cardTitle}>Historique des achats</Text>
        </View>

        {purchases.length > 0 ? (
          <ScrollView
            style={{ maxHeight: 320 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator
          >
            {purchases.map((purchase) => (
              <View
                key={purchase._id}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={{ fontWeight: "600", color: "#333" }}>
                  {purchase.quantity} billet(s)
                </Text>

                <Text style={{ color: "#666", marginTop: 4 }}>
                  {purchase.total_amount} {purchase.currency}
                </Text>

                <Text style={{ color: "#999", marginTop: 2 }}>
                  {new Date(purchase.created_at).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>Aucun achat pour le moment</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.settingsTitle}>Paramètres du compte</Text>

        {!isAdmin ? (
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
        ) : null}

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

        {isAdmin ? (
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
        ) : null}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
