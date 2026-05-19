import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },

    header: {
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    email: {
        color: "#fff",
        marginBottom: 20,
    },

    qrCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        width: "90%",
    },

    qrLeft: {
        backgroundColor: "#FFE3EA",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },

    qrTitle: {
        fontWeight: "bold",
    },

    qrSubtitle: {
        color: "#777",
        fontSize: 12,
    },

    card: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 15,
        borderRadius: 15,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    cardTitle: {
        marginLeft: 10,
        fontWeight: "bold",
    },

    walletRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    ticketBox: {
        flex: 1,
        padding: 15,
        borderRadius: 15,
        marginHorizontal: 5,
    },

    freeBox: {
        backgroundColor: "#CFE5C5",
    },

    paidBox: {
        backgroundColor: "#F5A3B7",
    },

    ticketLabel: {
        color: "#fff",
        fontSize: 12,
    },

    ticketNumber: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },

    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 15,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    totalText: {
        color: "#777",
    },

    totalAmount: {
        color: "#EC6A8E",
        fontWeight: "bold",
    },

    emptyText: {
        textAlign: "center",
        color: "#777",
        marginTop: 10,
    },
    settingsTitle: {
        fontWeight: "bold",
        marginBottom: 15,
    },

    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },

    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    settingIcon: {
        backgroundColor: "#FCE4EC",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },

    settingText: {
        fontSize: 14,
    },

    logoutButton: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: "#EC6A8E",
        padding: 15,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        marginLeft: 10,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginVertical: 8,
    },

    addButton: {
        backgroundColor: "#EC6A8E",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },

    headerClean: {
        paddingTop: 56,
        paddingBottom: 28,
        paddingHorizontal: 16,
        alignItems: "stretch",
    },

    headerContent: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },

    backButtonClean: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.14)",
    },

    headerTitleBox: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 8,
    },

    headerSpacer: {
        width: 34,
        height: 34,
    },

    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
    },

    subtitle: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 2,
    },

    emailHint: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 13,
        marginTop: 10,
        textAlign: "center",
    },

    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 50,
    },

    cardClean: {
        width: "90%",
        maxWidth: 450,
        backgroundColor: "#FCE4EC",
        borderRadius: 20,
        padding: 18,
        shadowColor: "#250404",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },

    sectionHeader: {
        fontSize: 16,
        fontWeight: "700",
        color: "#B85A7A",
        marginBottom: 16,
        textAlign: "center",
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#9E5A75",
        marginBottom: 6,
        marginTop: 6,
        marginLeft: 2,
    },

    passwordActionButton: {
        backgroundColor: "#EC6A8E",
        paddingVertical: 11,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    passwordActionText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        marginLeft: 8,
        textAlign: "center",
    },

    passwordActionButtonBottom: {
        marginTop: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#EC6A8E",
        backgroundColor: "#FFF5F8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    passwordActionTextBottom: {
        color: "#C84F79",
        fontSize: 13,
        fontWeight: "700",
        marginLeft: 8,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        paddingHorizontal: 18,
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },

    modalCard: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 18,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#B85A7A",
        textAlign: "center",
        marginBottom: 14,
    },

    modalActions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },

    modalCancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: "#F3F3F3",
        alignItems: "center",
    },

    modalCancelText: {
        color: "#555",
        fontWeight: "700",
    },

    modalConfirmButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: "#EC6A8E",
        alignItems: "center",
        justifyContent: "center",
    },

    modalConfirmText: {
        color: "#fff",
        fontWeight: "700",
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 9,
        paddingHorizontal: 13,
        borderRadius: 10,
        marginBottom: 14,
    },

    inputText: {
        marginLeft: 8,
        fontSize: 16,
        flex: 1,
    },

    btnContainer: {
        width: "90%",
        maxWidth: 400,
        marginTop: 20,
        alignSelf: "center",
        alignItems: "center",
    },

    btnGradient: {
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        width: 220,
        alignSelf: "center",
    },

    btnText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },

    errorBox: {
        backgroundColor: "rgba(214, 69, 69, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(214, 69, 69, 0.35)",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 10,
    },

    errorText: {
        color: "#D64545",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "600",
    },

    successBox: {
        backgroundColor: "rgba(78, 182, 106, 0.12)",
        borderWidth: 1,
        borderColor: "rgba(78, 182, 106, 0.35)",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 10,
    },

    successText: {
        color: "#2E8B57",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "600",
    },
    cardPremium: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 18,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },

    sectionTitle: {
        fontSize: 12,
        color: "#888",
        marginBottom: 10,
        paddingHorizontal: 15,
    },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
    },

    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FCE4EC",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    itemText: {
        fontSize: 14,
        fontWeight: "500",
    },
    bankCard: {
        width: "90%",
        maxWidth: 400,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
    },

    bankCardGradient: {
        padding: 20,
        height: 180,
        justifyContent: "space-between",
    },

    cardBrand: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        alignSelf: "flex-end",
    },

    cardNumber: {
        color: "#fff",
        fontSize: 18,
        letterSpacing: 2,
    },

    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardName: {
        color: "#fff",
        fontSize: 13,
    },

    addCard: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },

    addText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "500",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalCard: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    headerTickets: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chip: {
        width: 45,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#F7D27A",
        marginTop: 20,
        marginBottom: 18,
    },

    cardLabel: {
        color: "#fff",
        fontSize: 9,
        opacity: 0.8,
        marginBottom: 4,
    },

    bankCardGradient: {
        marginHorizontal: 24,
        marginTop: 40,
        borderRadius: 28,
        padding: 24,
        height: 215,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 18,
        elevation: 8,
    },

    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardBrand: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "900",
        letterSpacing: 1,
    },

    chip: {
        width: 52,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#F6D36B",
        marginTop: 8,
    },

    cardNumber: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 2.5,
        marginTop: 10,
    },

    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 10,
    },

    cardLabel: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 9,
        fontWeight: "600",
        marginBottom: 4,
        letterSpacing: 1,
    },

    cardName: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 1,
    },
    addCard: {
        marginHorizontal: 24,
        marginTop: 18,
        backgroundColor: "#fff",
        borderRadius: 18,
        paddingVertical: 18,
        width: "50%",
        alignSelf: "center",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },

    addText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
    },
    emptyPaymentBox: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 18,
        marginTop: 24,
        padding: 26,
        borderRadius: 22,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        },

        emptyPaymentIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#FFF1F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        },

        emptyPaymentTitle: {
        fontSize: 17,
        fontWeight: "900",
        color: "#0D2B3E",
        },

        emptyPaymentText: {
        marginTop: 6,
        color: "#777",
        textAlign: "center",
        fontSize: 13,
        },

        modalSubtitle: {
        textAlign: "center",
        color: "#777",
        fontSize: 13,
        marginTop: 4,
        marginBottom: 16,
        },

        inputOutlined: {
        borderWidth: 1.5,
        borderColor: "#F3B2C6",
        },

        formRow: {
        flexDirection: "row",
        gap: 10,
        },

        halfInput: {
        flex: 1,
        },

        cancelButton: {
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: "#FFF1F6",
        alignItems: "center",
        },

        cancelButtonText: {
        color: "#D85C8A",
        fontWeight: "800",
        fontSize: 14,
        },
        deleteCardButton: {
  marginLeft: 10,
  backgroundColor: "rgba(255,255,255,0.22)",
  padding: 7,
  borderRadius: 10,
},

deleteModalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.35)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 24,
},

deleteModalCard: {
  width: "100%",
  backgroundColor: "#FFFFFF",
  borderRadius: 24,
  padding: 24,
  alignItems: "center",
},

deleteIconBox: {
  width: 58,
  height: 58,
  borderRadius: 29,
  backgroundColor: "#FFF1F6",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 14,
},

deleteModalTitle: {
  fontSize: 18,
  fontWeight: "900",
  color: "#0D2B3E",
},

deleteModalText: {
  marginTop: 8,
  color: "#777",
  textAlign: "center",
  fontSize: 13,
  lineHeight: 19,
},

deleteModalActions: {
  flexDirection: "row",
  gap: 10,
  marginTop: 22,
  width: "100%",
},

deleteCancelButton: {
  flex: 1,
  paddingVertical: 13,
  borderRadius: 14,
  backgroundColor: "#FFF1F6",
  alignItems: "center",
},

deleteCancelText: {
  color: "#D85C8A",
  fontWeight: "800",
},

deleteConfirmButton: {
  flex: 1,
  paddingVertical: 13,
  borderRadius: 14,
  backgroundColor: "#D85C8A",
  alignItems: "center",
},

deleteConfirmText: {
  color: "#FFFFFF",
  fontWeight: "800",
},

});

export default styles;