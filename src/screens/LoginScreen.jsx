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
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password.trim());
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
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
        <Text style={styles.subtitle}>Welcome!</Text>

        <IconInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <IconInput
          icon="lock-closed-outline"
          placeholder="Password"
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
          <GradientButton title="Sign In" onPress={handleLogin} />
        )}

        <Text style={styles.footer}>
          No account yet?{" "}
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}