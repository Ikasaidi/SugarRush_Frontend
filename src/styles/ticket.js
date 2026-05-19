
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    titleTickets: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 6,

    },
    headerTickets: {
        paddingTop: 56,
        paddingHorizontal: 14,
        paddingBottom: 32,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
    },

    subtitleTickets: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 4,
        marginLeft: 0,
        opacity: 1,
    },

    ticketCard: {
        marginTop: 30,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    ticketTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },

    ticketSubtitle: {
        marginTop: 13,
        fontSize: 12,
        color: "#FF8FB3",
        textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
    },

    sectionTitle: {
        marginTop: 18,
        marginLeft: 16,
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#0D2B3E",
    },

    optionCard: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginBottom: 10,
        padding: 14,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },

    selectedCard: {
        borderWidth: 1.5,
        borderColor: "#FF79A8",
    },

    circle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },

    optionTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0D2B3E",
    },

    optionSubtitle: {
        fontSize: 11,
        color: "#777",
        marginTop: 3,
    },

    optionPrice: {
        fontSize: 15,
        fontWeight: "700",
        color: "#B85D83",
    },

    quantityCard: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginTop: 8,
        padding: 16,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },

    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },

    roundButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#FF8FB3",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "600",
    },

    quantityText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#B85D83",
    },

    totalCard: {
        backgroundColor: "#D85C8A",
        marginHorizontal: 12,
        marginTop: 12,
        padding: 18,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    totalLabel: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },

    totalPrice: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "800",
    },

    payButton: {
        backgroundColor: "#C8DDB5",
        marginHorizontal: 12,
        marginTop: 12,
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    payText: {
        color: "#0D2B3E",
        fontWeight: "700",
    },

    realTicket: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginTop: 18,
        marginBottom: 20,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    validBar: {
        backgroundColor: "#C8DDB5",
        padding: 8,
    },

    validText: {
        color: "#fff",
        fontWeight: "700",
    },

    ticketContent: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bottomRow: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    smallLabel: {
        fontSize: 11,
        color: "#888",
    },

    boldText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#0D2B3E",
        marginTop: 4,
    },

    typeText: {
        fontSize: 12,
        color: "#D85C8A",
        marginTop: 4,
    },

    qrRow: {
        padding: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    qrText: {
        color: "#FF6F9F",
        fontSize: 12,
    },
    paymentCard: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginBottom: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,

        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },

    selectedPaymentCard: {
        borderWidth: 1.5,
        borderColor: "#FF79A8",
        backgroundColor: "#FFF7FA",
    },

    paymentIconBox: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFE4EE",
        justifyContent: "center",
        alignItems: "center",
    },

    paymentCardNumber: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0D2B3E",
    },

    paymentCardName: {
        fontSize: 12,
        color: "#777",
        marginTop: 4,
    },

    paymentCheck: {
        marginLeft: "auto",
    },
    noCardBox: {
        backgroundColor: "#FFF7FA",
        marginHorizontal: 12,
        marginBottom: 14,
        padding: 14,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFD6E4",
    },

    noCardIconBox: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#FFE4EE",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    noCardTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0D2B3E",
    },

    noCardText: {
        marginTop: 4,
        color: "#D85C8A",
        fontSize: 12,
        lineHeight: 17,
    },
    quantityContainer: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 12,
        marginTop: 10,
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 20,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },

    quantityLabel: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0D2B3E",
    },

    quantitySubLabel: {
        marginTop: 4,
        fontSize: 11,
        color: "#888",
    },

    quantitySelector: {
        flexDirection: "row",
        alignItems: "center",
    },

    quantityButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#D85C8A",

        justifyContent: "center",
        alignItems: "center",
    },

    quantityButtonDisabled: {
        opacity: 0.4,
    },

    quantityMiddle: {
        width: 58,
        alignItems: "center",
    },

    quantityValue: {
        fontSize: 24,
        fontWeight: "900",
        color: "#B85D83",
    },
    ticketPreviewCard: {
  backgroundColor: "#FFFFFF",
  marginHorizontal: 12,
  marginTop: 16,
  padding: 16,
  borderRadius: 18,
  flexDirection: "row",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.07,
  shadowRadius: 8,
  elevation: 3,
},

ticketIconBox: {
  width: 54,
  height: 54,
  borderRadius: 18,
  backgroundColor: "#FFF0F6",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

ticketPreviewTitle: {
  fontSize: 16,
  fontWeight: "900",
  color: "#0D2B3E",
},

ticketPreviewText: {
  fontSize: 12,
  color: "#777",
  marginTop: 4,
  lineHeight: 17,
},

infoRow: {
  flexDirection: "row",
  marginHorizontal: 12,
  gap: 10,
  marginTop: 10,
},

infoBox: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 14,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
},

infoTitle: {
  marginTop: 8,
  fontSize: 13,
  fontWeight: "800",
  color: "#0D2B3E",
},

infoText: {
  marginTop: 3,
  fontSize: 11,
  color: "#777",
},

totalSubLabel: {
  color: "#FFEAF2",
  fontSize: 11,
  marginTop: 4,
},

toastBox: {
  marginHorizontal: 14,
  marginTop: 16,
  paddingVertical: 14,
  paddingHorizontal: 16,

  borderRadius: 16,

  flexDirection: "row",
  alignItems: "center",

  gap: 10,
},

toastSuccess: {
  backgroundColor: "#7DBA89",
},

toastWarning: {
  backgroundColor: "#D88A5C",
},

toastText: {
  color: "#fff",
  fontWeight: "700",
  flex: 1,
},
});
export default styles;