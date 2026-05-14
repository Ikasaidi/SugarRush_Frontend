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
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("student");

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
        username,
        email,
        password,
        fname,
        lname,
        phone,
        address,
        user_type: userType,
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

        <IconInput
          icon="person-outline"
          placeholder="First name"
          value={fname}
          onChangeText={setFname}
        />

        <IconInput
          icon="person-outline"
          placeholder="Last name"
          value={lname}
          onChangeText={setLname}
        />

        <IconInput
          icon="call-outline"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />

        <IconInput
          icon="home-outline"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.typeContainer}>
          <Text style={styles.typeTitle}>Account type</Text>

          <View style={styles.typeButtons}>
            {[
              { key: "student", label: "Student" },
              { key: "adult", label: "Adult" },
              { key: "senior", label: "Senior" },
            ].map((item) => (
              <Text
                key={item.key}
                style={[
                  styles.typeButton,
                  userType === item.key && styles.activeType,
                ]}
                onPress={() => setUserType(item.key)}
              >
                {item.label}
              </Text>
            ))}
          </View>
        </View>

        {/* LOADING STATE */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <GradientButton title="Create my account" onPress={handleSignup} />
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
