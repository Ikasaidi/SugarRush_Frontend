
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    titleTickets: {
        color: "#fff",
        marginTop: 40,
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 30,

    },

    subtitleTickets: {
        color: "#fff",
        fontSize: 15,
        marginTop: 5,
        marginLeft: 30,
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
});
export default styles;