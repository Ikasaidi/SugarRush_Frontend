import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

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

  // =========================================================
  // STATES
  // =========================================================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [userType, setUserType] =
    useState("student");

  const [loading, setLoading] = useState(false);

  // ERROR MESSAGE
  const [errorMessage, setErrorMessage] =
    useState("");

  // =========================================================
  // SIGNUP
  // =========================================================
  const handleSignup = async () => {

    // RESET ERROR
    setErrorMessage("");

    // VALIDATION FRONT
    if (!username || !email || !password) {

      setErrorMessage(
        "Please fill in all required fields."
      );

      return;
    }

    try {

      setLoading(true);

      console.log("SIGNUP DATA:", {
        username,
        email,
        password,
      });

      // REGISTER
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

      // AUTO LOGIN
      await login(
        email.trim(),
        password.trim()
      );

    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error?.response?.data || error.message
      );

      const backendMessage =
        error?.response?.data?.message;

      // MESSAGE PERSONNALISÉ
      if (
        backendMessage?.toLowerCase().includes("invalid") ||
        backendMessage?.toLowerCase().includes("incorrect") ||
        backendMessage?.toLowerCase().includes("password")
      ) {

        setErrorMessage(
          "The information entered is invalid. Please try again."
        );

      } else {

        setErrorMessage(
          backendMessage ||
          "Signup failed. Please try again."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================
  return (

    <LinearGradient
      colors={["#FF8FB3", "#EC6A8E"]}
      style={styles.background}
    >

      <View style={styles.card}>

        <LogoCircle />

        <Text style={styles.title}>
          Candy Train
        </Text>

        <Text style={styles.subtitle}>
          Create your account
        </Text>

        {/* USERNAME */}
        <IconInput
          icon="person-outline"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        {/* EMAIL */}
        <IconInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <IconInput
          icon="lock-closed-outline"
          placeholder="Password"
          secure
          value={password}
          onChangeText={setPassword}
        />

        {/* FIRST NAME */}
        <IconInput
          icon="person-outline"
          placeholder="First name"
          value={fname}
          onChangeText={setFname}
        />

        {/* LAST NAME */}
        <IconInput
          icon="person-outline"
          placeholder="Last name"
          value={lname}
          onChangeText={setLname}
        />

        {/* PHONE */}
        <IconInput
          icon="call-outline"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />

        {/* ADDRESS */}
        <IconInput
          icon="home-outline"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        {/* ACCOUNT TYPE */}
        <View style={styles.typeContainer}>

          <Text style={styles.typeTitle}>
            Account type
          </Text>

          <View style={styles.typeButtons}>

            {[
              {
                key: "student",
                label: "Student",
              },
              {
                key: "adult",
                label: "Adult",
              },
              {
                key: "senior",
                label: "Senior",
              },
            ].map((item) => (

              <Text
                key={item.key}
                style={[
                  styles.typeButton,
                  userType === item.key &&
                    styles.activeType,
                ]}
                onPress={() =>
                  setUserType(item.key)
                }
              >
                {item.label}
              </Text>

            ))}

          </View>
        </View>

        {/* ERROR MESSAGE */}
        {errorMessage ? (

          <View style={styles.errorBox}>

            <Text style={styles.errorText}>
              {errorMessage}
            </Text>

          </View>

        ) : null}

        {/* BUTTON / LOADING */}
        {loading ? (

          <ActivityIndicator
            size="large"
            color="#fff"
          />

        ) : (

          <GradientButton
            title="Create my account"
            onPress={handleSignup}
          />

        )}

        {/* FOOTER */}
        <Text style={styles.footer}>

          Already have an account?{" "}

          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("Login")
            }
          >
            Log in
          </Text>

        </Text>

        <PageDots />

      </View>

    </LinearGradient>
  );
}