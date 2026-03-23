import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles/profile";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Email et notifications</Text>

      <View style={styles.settingItem}>
        <Text>Email notifications</Text>
        <Switch />
      </View>

      <View style={styles.settingItem}>
        <Text>Push notifications</Text>
        <Switch />
      </View>
    </View>
  );
}