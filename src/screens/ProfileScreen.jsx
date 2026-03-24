import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; 
import styles from "../styles/profile";


export default function ProfileScreen() {

    const { logout } = useContext(AuthContext); // ✅ IMPORTANT
    const navigation = useNavigation(); // ✅ IMPORTANT

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <LinearGradient
                colors={["#FF8FB3", "#EC6A8E"]}
                style={styles.header}
            >
                <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={40} color="#EC6A8E" />
                </View>
                <Text style={styles.email}>@candytrain.com</Text>

                <TouchableOpacity style={styles.qrCard}>
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

                <Text style={styles.emptyText}>
                    Aucun achat pour le moment
                </Text>
            </View>

            {/* SETTINGS */}
            <View style={styles.card}>
                <Text style={styles.settingsTitle}>Paramètres du compte</Text>

                {/* 👤 */}
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

                {/* 📧 */}
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

                {/* 💳 */}
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
            </View>

            {/* LOGOUT */}
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={logout} 
            >
                <Ionicons name="log-out-outline" size={18} color="#fff" />
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>

        </View>
    );
}