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

  // STATE
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 SIGNUP HANDLER CLEAN
  const handleSignup = async () => {
    // ✅ validation front (évite appels inutiles)
    if (!username || !email || !password) {
      return Alert.alert("Erreur", "Tous les champs sont requis");
    }

    try {
      setLoading(true);

      console.log("SIGNUP DATA:", { username, email, password });

      // 1. REGISTER
      await register({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        user_type: "student",
      });

      console.log("REGISTER SUCCESS");

      // 2. LOGIN seulement si register OK
      await login(email.trim(), password.trim());

    } catch (error) {
      console.log("SIGNUP ERROR:", error?.response?.data || error.message);

      // 🔥 message backend plus précis si dispo
      const message =
        error?.response?.data?.message ||
        "Inscription échouée. Vérifie les champs.";

      Alert.alert("Erreur", message);

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

        {/* INPUTS CONNECTÉS */}
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

        {/* LOADING STATE */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <GradientButton
            title="Create my account"
            onPress={handleSignup}
          />
        )}

        <Text style={styles.footer}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>

        <PageDots />

      </View>
    </LinearGradient>
  );
}