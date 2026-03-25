import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        paddingTop: 60,
        paddingBottom: 25,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    filters: {
        flexDirection: "row",
        marginTop: 10,
    },

    filter: {
        color: "#fff",
        marginRight: 10,
        fontSize: 12,
    },

    filterActive: {
        backgroundColor: "#fff",
        color: "#EC6A8E",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 10,
        fontSize: 12,
    },

    background: {
        flex: 1,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    side: {
        flex: 1,
    },

    center: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
    },

    station: {
        fontSize: 13,
        fontWeight: "500",
    },

    time: {
        fontSize: 11,
        color: "#777",
    },

    duration: {
        fontSize: 10,
        color: "#EC6A8E",
        marginTop: 3,
    },

    dotGreen: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#CFE5C5",
        marginBottom: 4,
    },

    dotPink: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#EC6A8E",
        marginTop: 4,
    },

    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#EC6A8E",
    },

    buyBtn: {
        backgroundColor: "#EC6A8E",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    buyText: {
        color: "#fff",
        fontSize: 12,
    },

    full: {
        color: "#999",
        fontSize: 12,
    },
    filterBtn: {
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    filterText: {
        color: "#fff",
        fontSize: 12,
    },

    filterActive: {
        backgroundColor: "#fff",
    },

    filterTextActive: {
        color: "#EC6A8E",
    },
});