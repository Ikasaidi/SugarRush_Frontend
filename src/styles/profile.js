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
        paddingTop: 55,
        paddingBottom: 25,
        alignItems: "center",
    },

    backButtonClean: {
        position: "absolute",
        left: 15,
        top: 55,
    },

    title: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "600",
    },

    subtitle: {
        color: "#fff",
        fontSize: 20,
        marginTop: 2,
    },

    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 50,
    },

    cardClean: {
        width: "90%",
        maxWidth: 450,
        backgroundColor: "#EC6A8E",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#250404",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingVertical: 9,
        paddingHorizontal: 13,
        borderRadius: 10,
        marginBottom: 55,
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
    },

    btnGradient: {
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },

});

export default styles;