import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

import IconInput from "../components/IconInput";
import styles from "../styles/profile";

export default function PersonalInfoScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const initialValues = useMemo(
    () => ({
      username: user?.username || "",
      lname: user?.lname || "",
      fname: user?.fname || "",
      phone: user?.phone || "",
      address: user?.address || "",
    }),
    [user]
  );

  const [username, setUsername] = useState(initialValues.username);
  const [lname, setLname] = useState(initialValues.lname);
  const [fname, setFname] = useState(initialValues.fname);
  const [phone, setPhone] = useState(initialValues.phone);
  const [address, setAddress] = useState(initialValues.address);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const formatPhone = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validate = () => {
    const nextErrors = {};
    const phoneDigits = phone.replace(/\D/g, "");
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

    if (!username.trim()) nextErrors.username = "Le nom d'utilisateur est requis.";
    else if (!usernameRegex.test(username.trim())) {
      nextErrors.username = "Nom d'utilisateur invalide (3 à 30 lettres, chiffres ou _).";
    }
    if (!fname.trim()) nextErrors.fname = "Le prénom est requis.";
    if (!lname.trim()) nextErrors.lname = "Le nom de famille est requis.";
    if (fname.trim() && fname.trim().length < 2) {
      nextErrors.fname = "Le prénom doit contenir au moins 2 caractères.";
    }
    if (lname.trim() && lname.trim().length < 2) {
      nextErrors.lname = "Le nom de famille doit contenir au moins 2 caractères.";
    }
    if (phone && phoneDigits.length !== 10) {
      nextErrors.phone = "Le téléphone doit ressembler à 413-222-2222.";
    }
    if (address.trim() && address.trim().length < 5) {
      nextErrors.address = "L'adresse est trop courte.";
    }

    return nextErrors;
  };

  const validatePasswordChange = () => {
    const nextErrors = {};

    if (!newPassword.trim()) {
      nextErrors.newPassword = "Le nouveau mot de passe est requis.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(newPassword)) {
      nextErrors.newPassword = "Le mot de passe doit contenir 8 caractères ou plus avec majuscule, minuscule, chiffre et symbole.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Confirmez le mot de passe.";
    } else if (newPassword.trim() && confirmPassword.trim() !== newPassword.trim()) {
      nextErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    return nextErrors;
  };

  const save = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setErrorMessage("Veuillez corriger les champs en surbrillance.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.patch("/users/me", {
        username: username.trim(),
        fname: fname.trim(),
        lname: lname.trim(),
        phone: phone.trim(),
        address: address.trim(),
        
      });

      setUser(res.data);
      setSuccessMessage("Informations mises à jour avec succès !");
    } catch (err) {
      const backendMessage = err?.response?.data?.message;

      if (backendMessage?.toLowerCase().includes("phone")) {
        setErrorMessage("Le numéro de téléphone est invalide.");
      } else if (backendMessage?.toLowerCase().includes("name")) {
        setErrorMessage("Le prénom ou le nom de famille est invalide.");
      } else {
        setErrorMessage(backendMessage || "Une erreur est survenue. Réessaie plus tard.");
      }

      console.log("UPDATE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const nextErrors = validatePasswordChange();
    setErrors((prev) => ({ ...prev, ...nextErrors }));

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const res = await API.patch("/users/me", {
        password: newPassword.trim(),
      });

      setUser(res.data);
      setSuccessMessage("Mot de passe modifié avec succès !");
      setPasswordModalVisible(false);
      setNewPassword("");
      setConfirmPassword("");
      setErrors((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
    } catch (err) {
      const backendMessage = err?.response?.data?.message;
      setErrorMessage(backendMessage || "Impossible de changer le mot de passe.");
      console.log("PASSWORD CHANGE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.headerClean}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.backButtonClean}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>Mon Profil</Text>
            <Text style={styles.subtitle}>Modifier mes informations</Text>

           
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.cardClean}>
              <Text style={styles.sectionHeader}>Informations personnelles</Text>

              <Text style={styles.fieldLabel}>Nom d'utilisateur</Text>
              <IconInput
                icon="at-outline"
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
                }}
                error={errors.username}
              />

              <Text style={styles.fieldLabel}>Nom de famille</Text>
              <IconInput
                icon="person-outline"
                placeholder="Nom de famille"
                value={lname}
                onChangeText={(text) => {
                  setLname(text);
                  if (errors.lname) setErrors((prev) => ({ ...prev, lname: "" }));
                }}
                error={errors.lname}
              />

              <Text style={styles.fieldLabel}>Prénom</Text>
              <IconInput
                icon="person-outline"
                placeholder="Prénom"
                value={fname}
                onChangeText={(text) => {
                  setFname(text);
                  if (errors.fname) setErrors((prev) => ({ ...prev, fname: "" }));
                }}
                error={errors.fname}
              />

              <Text style={styles.fieldLabel}>Téléphone</Text>
              <IconInput
                icon="call-outline"
                placeholder="Téléphone"
                value={phone}
                onChangeText={(text) => {
                  setPhone(formatPhone(text));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                keyboardType="phone-pad"
                error={errors.phone}
              />

              <Text style={styles.fieldLabel}>Adresse</Text>
              <IconInput
                icon="location-outline"
                placeholder="Adresse"
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
                }}
                error={errors.address}
              />

              {errorMessage ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {successMessage ? (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>{successMessage}</Text>
                </View>
              ) : null}

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={save} disabled={loading}>
                  <LinearGradient
                    colors={["#FF8FB3", "#EC6A8E"]}
                    style={[styles.btnGradient, loading && { opacity: 0.75 }]}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.btnText}>Enregistrer</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.passwordActionButtonBottom}
                onPress={() => setPasswordModalVisible(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="lock-closed-outline" size={16} color="#EC6A8E" />
                <Text style={styles.passwordActionTextBottom}>Changer le mot de passe</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setPasswordModalVisible(false)}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Changer le mot de passe</Text>

            <Text style={styles.fieldLabel}>Nouveau mot de passe</Text>
            <IconInput
              icon="lock-closed-outline"
              placeholder="Nouveau mot de passe"
              secure
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
              error={errors.newPassword}
            />

            <Text style={styles.fieldLabel}>Confirmer le mot de passe</Text>
            <IconInput
              icon="lock-closed-outline"
              placeholder="Confirmer le mot de passe"
              secure
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={errors.confirmPassword}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setPasswordModalVisible(false);
                  setErrors((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={changePassword}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalConfirmText}>Confirmer</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}