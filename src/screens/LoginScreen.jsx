import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear error message when screen is unfocused
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Don't clear on unfocus - keep the state
      };
    }, [])
  );

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Veuillez entrer votre email et votre mot de passe.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password.trim());
    } catch (error) {
      const message =
        error?.response?.data?.message || "Échec de la connexion. Réessaie plus tard.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.background}>
      <View style={styles.card}>
        <AnimatedLogo />

        <Text style={styles.title}>Candy Train</Text>
        <Text style={styles.subtitle}>Bienvenue !</Text>

        <IconInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <IconInput
          icon="lock-closed-outline"
          placeholder="Mot de passe"
          secure
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {/* ERROR MESSAGE */}
        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* BUTTON / LOADING */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <GradientButton title="Se connecter" onPress={handleLogin} />
        )}

        <Text style={styles.footer}>
          Pas encore de compte ?{" "}
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("Signup")}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}