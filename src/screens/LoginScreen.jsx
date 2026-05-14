import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import styles from "../styles/login";

import AnimatedLogo from "../components/AnimatedLogo";
import IconInput from "../components/IconInput";
import GradientButton from "../components/GradientButton";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return Alert.alert("Erreur", "Remplis email + password");
      }

      await login(email.trim(), password.trim());

    } catch (e) {
      Alert.alert("Erreur", "Login failed");
    }
  };

  return (
    <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.background}>
      <View style={styles.card}>

        <AnimatedLogo />

        <Text style={styles.title}>Candy Train</Text>
        <Text style={styles.subtitle}>Welcome!</Text>

        <IconInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <IconInput
          icon="lock-closed-outline"
          placeholder="Password"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <GradientButton title="Sign In" onPress={handleLogin} />

        <Text style={styles.footer}>
          No account yet?{" "}
          <Text style={styles.signUp} onPress={() => navigation.navigate("Signup")}>
            Sign up
          </Text>
        </Text>

      </View>
    </LinearGradient>
  );
}