import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 15,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 11,
    color: "#888",
  },

  time: {
    fontSize: 11,
    color: "#EC6A8E",
  },

  duration: {
    alignSelf: "center",
    color: "#EC6A8E",
  },

  section: {
    marginBottom: 10,
    fontWeight: "600",
  },

  option: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  optionActive: {
    borderWidth: 2,
    borderColor: "#EC6A8E",
  },

  qtyBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  btn: {
    fontSize: 20,
    color: "#EC6A8E",
  },

  qty: {
    fontSize: 18,
  },

  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  totalPrice: {
    fontWeight: "600",
    color: "#EC6A8E",
  },

  payBtn: {
    marginTop: 15,
    backgroundColor: "#CFE5C5",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  payText: {
    fontWeight: "600",
  },

});