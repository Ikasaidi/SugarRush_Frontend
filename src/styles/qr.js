import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const cardWidth = Math.min(width * 0.9, 420);

const styles = StyleSheet.create({
  titleTickets: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitleTickets: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
    marginLeft: 0,
    opacity: 0.95,
  },

  qrCardContainer: {
    width: cardWidth,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  qrHeader: {
    paddingVertical: 15,
    alignItems: "center",
  },

  qrAvatar: {
    backgroundColor: "#fff",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  qrUser: {
    color: "#fff",
    fontSize: 12,
  },

  qrBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },

  qrIdBox: {
    backgroundColor: "#F5E6EB",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  qrIdLabel: {
    fontSize: 10,
    color: "#888",
  },

  qrId: {
    fontSize: 13,
    fontWeight: "600",
    color: "#EC6A8E",
  },

  verifiedBox: {
    marginTop: 12,
    marginHorizontal: 20,
    backgroundColor: "#CFE5C5",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  verifiedText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "500",
    color: "#2E7D32",
  },

  qrInfoBox: {
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FCE4EC",
    padding: 15,
    borderRadius: 15,
  },

  qrInfoTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },

  qrInfoText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  tipBox: {
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  tipText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  headerTickets: {
    paddingTop: 56,
    paddingHorizontal: 14,
    paddingBottom: 32,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    }, 
});

export default styles;
