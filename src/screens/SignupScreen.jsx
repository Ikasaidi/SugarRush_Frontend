import React, { useContext, useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import LogoCircle from "../components/LogoCircle";
import IconInput from "../components/IconInput";
import GradientButton from "../components/GradientButton";
import PageDots from "../components/PageDots";

import styles from "../styles/signup";

export default function SignupScreen() {
  const { register, login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      return Alert.alert("Erreur", "Tous les champs sont requis");
    }

    try {
      setLoading(true);

      const signupData = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        user_type: "student",
      };

      console.log("🚀 SIGNUP DATA SENT:", signupData);

      // 1. Inscription
      await register(signupData);

      console.log("✅ REGISTER SUCCESS");

      // 2. Connexion automatique
      await login(email.trim().toLowerCase(), password.trim());

      console.log("✅ AUTO-LOGIN SUCCESS");
      // navigation.navigate("Home"); // Décommente quand tu auras la route

    } catch (error) {
      console.error("🔥 FULL SIGNUP ERROR:", error);
      console.error("Response:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Inscription échouée. Vérifie tes informations.";

      Alert.alert("Erreur d'inscription", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.background}>
      <View style={styles.card}>
        <LogoCircle />

        <Text style={styles.title}>Candy Train</Text>
        <Text style={styles.subtitle}>Create your account</Text>

        <IconInput
          icon="person-outline"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

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

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <GradientButton title="Create my account" onPress={handleSignup} />
        )}

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Log in
          </Text>
        </Text>

        <PageDots />
      </View>
    </LinearGradient>
  );
}