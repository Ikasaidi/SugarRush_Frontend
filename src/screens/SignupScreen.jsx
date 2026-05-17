import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Platform,
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
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // =========================================================
  // SIGNUP
  // =========================================================
  const handleSignup = async () => {

    // RESET ERROR
    setErrorMessage("");
    setErrors({});

    // VALIDATION FRONT
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!username) newErrors.username = "Le nom d'utilisateur est requis.";
    else if (!usernameRegex.test(username)) newErrors.username = "Nom d'utilisateur invalide (3 à 30 lettres, chiffres ou _).";

    if (!email) newErrors.email = "L'email est requis.";
    else if (!emailRegex.test(email)) newErrors.email = "Votre email est pas valide.";

    if (!password) newErrors.password = "Le mot de passe est requis.";
    else if (!passwordRegex.test(password)) {
      newErrors.password = "Le mot de passe doit contenir 8 caractères ou plus avec majuscule, minuscule, chiffre et symbole.";
    }

    if (lname && lname.length < 2) newErrors.lname = "Le nom de famille est trop court.";

    // phone: expect 10 digits
    const phoneDigits = phone.replace(/\D/g, '');
    if (phone && phoneDigits.length !== 10) newErrors.phone = "Le téléphone doit contenir 10 chiffres (ex. 413-222-2222).";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
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
      if (backendMessage?.toLowerCase().includes("password")) {

        setErrorMessage(
          "Le mot de passe est invalide. Utilise 8+ caractères avec majuscule, minuscule, chiffre et symbole."
        );

      } else if (
        backendMessage?.toLowerCase().includes("invalid") ||
        backendMessage?.toLowerCase().includes("incorrect")
      ) {

        setErrorMessage(
          "Les informations saisies sont invalides. Réessaie plus tard."
        );

      } else {

        setErrorMessage(
          backendMessage ||
          "Échec de l'inscription. Réessaie plus tard."
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.card}>

        <LogoCircle />

        <Text style={styles.title}>
          Candy Train
        </Text>

        <Text style={styles.subtitle}>
          Créez votre compte
        </Text>

        {/* ERROR MESSAGE */}
        {errorMessage ? (

          <View style={styles.errorBox}>

            <Text style={styles.errorText}>
              {errorMessage}
            </Text>

          </View>

        ) : null}

        {/* USERNAME */}
        <IconInput
          icon="person-outline"
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={(t) => { setUsername(t); if (errors.username) setErrors(prev=> ({...prev, username: ''})); }}
          onBlur={() => {
            if (!username) setErrors(prev => ({ ...prev, username: "Le nom d'utilisateur est requis." }));
          }}
          error={errors.username}
        />

        {/* EMAIL */}
        <IconInput
          icon="mail-outline"
          placeholder="E-mail"
          value={email}
          onChangeText={(t) => { setEmail(t); if (errors.email) setErrors(prev=> ({...prev, email: ''})); }}
          keyboardType="email-address"
          onBlur={() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) setErrors(prev => ({ ...prev, email: "L'adresse e-mail est invalide." }));
          }}
          error={errors.email}
        />

        {/* PASSWORD */}
        <IconInput
          icon="lock-closed-outline"
          placeholder="Mot de passe"
          secure
          value={password}
          onChangeText={(t) => { setPassword(t); if (errors.password) setErrors(prev=> ({...prev, password: ''})); }}
          error={errors.password}
        />

        {/* FIRST NAME */}
        <IconInput
          icon="person-outline"
          placeholder="Prénom"
          value={fname}
          onChangeText={(t) => { setFname(t); }}
        />

        {/* LAST NAME */}
        <IconInput
          icon="person-outline"
          placeholder="Nom de famille"
          value={lname}
          onChangeText={(t) => { setLname(t); if (errors.lname) setErrors(prev=> ({...prev, lname: ''})); }}
          error={errors.lname}
        />

        {/* PHONE */}
        <IconInput
          icon="call-outline"
          placeholder="Téléphone"
          value={phone}
          onChangeText={(t) => { setPhone(t); if (errors.phone) setErrors(prev=> ({...prev, phone: ''})); }}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        {/* ADDRESS */}
        <IconInput
          icon="home-outline"
          placeholder="Adresse"
          value={address}
          onChangeText={(t) => { setAddress(t); }}
        />

        {/* ACCOUNT TYPE */}
          <View style={styles.typeContainer}>

          <Text style={styles.typeTitle}>
            Type de compte
          </Text>

          <View style={styles.typeButtons}>

            {[
              { key: "student", label: "Étudiant" },
              { key: "adult", label: "Adulte" },
              { key: "senior", label: "Sénior" },
            ].map((item) => (

              <TouchableOpacity
                key={item.key}
                style={[
                  styles.typeButton,
                  userType === item.key && styles.activeType,
                ]}
                onPress={() => setUserType(item.key)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    userType === item.key && styles.activeTypeText,
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>

            ))}

          </View>
        </View>

        {/* BUTTON / LOADING */}
        {loading ? (

          <ActivityIndicator
            size="large"
            color="#fff"
          />

        ) : (

          <GradientButton
            title="Créer mon compte"
            onPress={handleSignup}
          />

        )}

        {/* FOOTER */}
        <Text style={styles.footer}>

          Vous avez déjà un compte ?{" "}

          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("Login")
            }
          >
            Se connecter
          </Text>

        </Text>

        <PageDots />

          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </LinearGradient>
  );
}