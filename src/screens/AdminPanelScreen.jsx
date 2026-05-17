import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Alert,
	RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import API from "../services/api";
import styles from "../styles/profile";

const TRAIN_STOP_URL = "https://10.10.17.15/stop";

export default function AdminPanelScreen() {
	const navigation = useNavigation();
	const { user } = useContext(AuthContext);
	const isAdmin = user?.user_type === "admin";

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [actionId, setActionId] = useState(null);
	const [trainLoading, setTrainLoading] = useState(false);
	const [error, setError] = useState("");
	const [feedback, setFeedback] = useState({ text: "", type: "" });

	const showFeedback = (text, type = "success") => {
		setFeedback({ text, type });
	};

	const stopTrainAutomatically = async () => {
		if (!TRAIN_STOP_URL || TRAIN_STOP_URL.includes("YOUR_TRAIN_IP")) {
			showFeedback("Mets l'IP du train dans le code avant de lancer le POST.", "error");
			return;
		}

		setTrainLoading(true);
		showFeedback("", "");

		try {
			const response = await fetch(TRAIN_STOP_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "stop",
					source: "admin-panel",
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP_${response.status}`);
			}

			showFeedback("Train arrêté avec succès.", "success");
		} catch (err) {
			const errorText = String(err?.message || "");

			if (
				errorText.includes("Network request failed") ||
				errorText.includes("Failed to fetch") ||
				errorText.includes("fetch") ||
				errorText.includes("HTTP_0")
			) {
				showFeedback("Adresse du train injoignable. Vérifie l'IP ou la connexion.", "error");
			} else if (errorText.startsWith("HTTP_")) {
				showFeedback("Le train a répondu avec une erreur. Réessaie plus tard.", "error");
			} else {
				showFeedback("Impossible d'arrêter le train.", "error");
			}
			console.log("TRAIN STOP ERROR:", err?.message || err);
		} finally {
			setTrainLoading(false);
		}
	};

	const loadUsers = async () => {
		if (!isAdmin) {
			setLoading(false);
			return;
		}

		setError("");
		setFeedback({ text: "", type: "" });

		try {
			const res = await API.get("/users/non-admins");

			const list = res?.data?.users || res?.data || [];
			setUsers(Array.isArray(list) ? list : []);
		} catch (err) {
			console.log("LOAD USERS ERROR:", err?.response?.data || err.message);
			setError("Impossible de charger la liste des utilisateurs.");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		loadUsers();
	}, [isAdmin]);

	const promoteUser = async (targetUserId) => {
		setActionId(targetUserId);

		try {
			await API.post("/users/promote-to-admin", { targetUserId });

			setUsers((currentUsers) =>
				currentUsers.filter((item) => item.id !== targetUserId)
			);
			showFeedback("Utilisateur promu en admin avec succès.", "success");
		} catch (err) {
			showFeedback(
				err?.response?.data?.message || "La promotion a échoué.",
				"error"
			);
		} finally {
			setActionId(null);
		}
	};

	const deleteUser = async (targetUserId) => {
		Alert.alert(
			"Supprimer l'utilisateur",
			"Cette action est définitive. Continuer ?",
			[
				{ text: "Annuler", style: "cancel" },
				{
					text: "Supprimer",
					style: "destructive",
					onPress: async () => {
						setActionId(targetUserId);

						try {
							await API.delete(`/users/${targetUserId}`);

							setUsers((currentUsers) =>
								currentUsers.filter((item) => item.id !== targetUserId)
							);
							showFeedback("Utilisateur supprimé avec succès.", "success");
						} catch (err) {
							showFeedback(
								err?.response?.data?.message || "La suppression a échoué.",
								"error"
							);
						} finally {
							setActionId(null);
						}
					},
				},
			]
		);
	};

	const renderUser = ({ item }) => {
		const displayName = [item.fname, item.lname].filter(Boolean).join(" ").trim();

		return (
			<View
				style={{
					backgroundColor: "#fff",
					borderRadius: 18,
					padding: 16,
					marginBottom: 12,
					borderWidth: 1,
					borderColor: "#F4D8E0",
				}}
			>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View style={{ flex: 1, paddingRight: 12 }}>
						<Text style={{ fontSize: 16, fontWeight: "700", color: "#231F20" }}>
							{displayName || item.username || "Utilisateur"}
						</Text>

						<Text style={{ color: "#777", marginTop: 4 }}>{item.email}</Text>

						<View
							style={{
								marginTop: 10,
								alignSelf: "flex-start",
								backgroundColor: "#FCE4EC",
								paddingHorizontal: 10,
								paddingVertical: 4,
								borderRadius: 999,
							}}
						>
							<Text style={{ color: "#C94B72", fontSize: 12, fontWeight: "600" }}>
								{item.user_type || "student"}
							</Text>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => promoteUser(item.id)}
						disabled={actionId === item.id}
						style={{
							width: 44,
							height: 44,
							borderRadius: 22,
							backgroundColor: actionId === item.id ? "#F4C8D6" : "#EC6A8E",
							justifyContent: "center",
							alignItems: "center",
							marginRight: 10,
						}}
					>
						{actionId === item.id ? (
							<ActivityIndicator color="#fff" size="small" />
						) : (
							<Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
						)}
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => deleteUser(item.id)}
						disabled={actionId === item.id}
						style={{
							width: 44,
							height: 44,
							borderRadius: 22,
							backgroundColor: actionId === item.id ? "#F7D8DD" : "#D94A5B",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Ionicons name="trash-outline" size={20} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	if (!isAdmin) {
		return (
			<View style={[styles.container, { justifyContent: "center", padding: 24 }]}> 
				<View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 24 }}>
					<Ionicons name="lock-closed-outline" size={34} color="#EC6A8E" />
					<Text
						style={{
							fontSize: 22,
							fontWeight: "700",
							marginTop: 12,
							color: "#231F20",
						}}
					>
						Accès refusé
					</Text>
					<Text style={{ color: "#666", marginTop: 8, lineHeight: 20 }}>
						Cette page est réservée aux administrateurs.
					</Text>

					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{
							marginTop: 18,
							backgroundColor: "#EC6A8E",
							paddingVertical: 12,
							borderRadius: 14,
							alignItems: "center",
						}}
					>
						<Text style={{ color: "#fff", fontWeight: "700" }}>Retour</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<LinearGradient colors={["#FF8FB3", "#EC6A8E"]} style={styles.headerClean}>
				<TouchableOpacity
					style={styles.backButtonClean}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back" size={20} color="#fff" />
				</TouchableOpacity>

				<Text style={styles.title}>Admin Panel</Text>
			<Text style={styles.subtitle}>Gestion des utilisateurs</Text>
			</LinearGradient>

			<View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
			<View
				style={{
					alignItems: "center",
					marginBottom: 16,
					backgroundColor: "#fff",
					borderRadius: 22,
					paddingVertical: 16,
					paddingHorizontal: 18,
					borderWidth: 2,
					borderColor: "#EC6A8E",
					shadowColor: "#EC6A8E",
					shadowOpacity: 0.14,
					shadowRadius: 12,
					elevation: 3,
				}}
			>
				<View
					style={{
						paddingHorizontal: 14,
						paddingVertical: 6,
						borderRadius: 999,
						backgroundColor: "#FCE4EC",
						marginBottom: 12,
						borderWidth: 1,
						borderColor: "#EC6A8E",
					}}
				>
					<Text style={{ color: "#C94B72", fontWeight: "800", fontSize: 12 }}>
						ACTION RAPIDE
					</Text>
				</View>

				<TouchableOpacity
					onPress={stopTrainAutomatically}
					disabled={trainLoading}
					activeOpacity={0.85}
					style={{ marginBottom: 10 }}
				>
					<LinearGradient
						colors={["#FFB3C7", "#EC6A8E", "#D94A5B"]}
						style={{
							width: 104,
							height: 104,
							borderRadius: 52,
							justifyContent: "center",
							alignItems: "center",
							shadowColor: "#EC6A8E",
							shadowOpacity: 0.3,
							shadowRadius: 14,
							elevation: 8,
							borderWidth: 2,
							borderColor: "#fff",
						}}
					>
						{trainLoading ? (
							<ActivityIndicator color="#fff" size="small" />
						) : (
							<Ionicons name="heart" size={38} color="#fff" />
						)}
					</LinearGradient>
				</TouchableOpacity>

				<Text
					style={{
						color: "#C94B72",
						fontWeight: "800",
						fontSize: 15,
						letterSpacing: 0.2,
					}}
				>
					Stop train automatiquement
				</Text>
				<Text style={{ color: "#7A5560", fontSize: 12, marginTop: 4 }}>
					Clique ici pour envoyer le POST au train.
				</Text>
			</View>

				<View
					style={{
						backgroundColor: "#fff",
						borderRadius: 18,
						padding: 16,
						marginBottom: 16,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={{ flex: 1, paddingRight: 12 }}>
						<Text style={{ fontSize: 18, fontWeight: "700", color: "#231F20" }}>
							Utilisateurs non-admin
						</Text>
						<Text style={{ color: "#666", marginTop: 4 }}>
							Promouvoir un compte ou le supprimer.
						</Text>
					</View>

					<TouchableOpacity
						onPress={loadUsers}
						style={{
							width: 44,
							height: 44,
							borderRadius: 22,
							backgroundColor: "#FCE4EC",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Ionicons name="refresh-outline" size={20} color="#EC6A8E" />
					</TouchableOpacity>
				</View>

				{error ? (
					<View
						style={{
							backgroundColor: "#FFF1F3",
							borderRadius: 16,
							padding: 14,
							marginBottom: 16,
						}}
					>
						<Text style={{ color: "#B4233B", fontWeight: "600" }}>{error}</Text>
					</View>
				) : null}

				{feedback.text ? (
					<View
						style={{
							backgroundColor:
								feedback.type === "success" ? "#FCE4EC" : "#FFE8EF",
							borderRadius: 14,
							paddingVertical: 10,
							paddingHorizontal: 12,
							marginBottom: 16,
							borderWidth: 1,
							borderColor:
								feedback.type === "success" ? "#EC6A8E" : "#C94B72",
						}}
					>
						<Text
							style={{
								color: feedback.type === "success" ? "#C94B72" : "#A83A5A",
								fontWeight: "600",
								fontSize: 13,
							}}
						>
							{feedback.text}
						</Text>
					</View>
				) : null}

				{loading ? (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<ActivityIndicator size="large" color="#EC6A8E" />
					</View>
				) : (
					<FlatList
						data={users}
						keyExtractor={(item) => String(item.id)}
						renderItem={renderUser}
						contentContainerStyle={{ paddingBottom: 30 }}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={() => {
									setRefreshing(true);
									loadUsers();
								}}
								tintColor="#EC6A8E"
								colors={["#EC6A8E"]}
							/>
						}
						ListEmptyComponent={
							<View
								style={{
									backgroundColor: "#fff",
									borderRadius: 18,
									padding: 20,
									alignItems: "center",
								}}
							>
								<Ionicons name="people-outline" size={30} color="#EC6A8E" />
								<Text style={{ marginTop: 10, color: "#666", textAlign: "center" }}>
									Aucun utilisateur à afficher.
								</Text>
							</View>
						}
					/>
				)}
			</View>
		</View>
	);
}
