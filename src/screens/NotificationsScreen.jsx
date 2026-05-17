import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/profile";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [promoNotif, setPromoNotif] = useState(true);

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

        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Préférences</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.cardPremium}>

          <Text style={styles.sectionTitle}>Général</Text>


          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="mail-outline" size={16} color="#EC6A8E" />
              </View>
              <Text style={styles.itemText}>E-mails</Text>
            </View>

            <Switch
              value={emailNotif}
              onValueChange={setEmailNotif}
              trackColor={{ false: "#ddd", true: "#CFE5C5" }}
              thumbColor={emailNotif ? "#fff" : "#fff"}
            />
          </View>

          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="notifications-outline" size={16} color="#EC6A8E" />
              </View>
              <Text style={styles.itemText}>Notifications push</Text>
            </View>

            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              trackColor={{ false: "#ddd", true: "#CFE5C5" }}
            />
          </View>

          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="pricetag-outline" size={16} color="#EC6A8E" />
              </View>
              <Text style={styles.itemText}>Offres et promos</Text>
            </View>

            <Switch
              value={promoNotif}
              onValueChange={setPromoNotif}
              trackColor={{ false: "#ddd", true: "#CFE5C5" }}
            />
          </View>

        </View>

      </ScrollView>
    </View>
  );
}