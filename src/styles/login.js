import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#EC6A8E",
  gradientStart: "#FF8FB3",
  gradientEnd: "#EC6A8E",
  placeholder: "#C4C4C4",
  textDark: "#333",
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 8,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#B45C7D",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD1DC",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    width: "100%",
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.textDark,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 16,
    width: 310,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    marginRight: 8,
    marginLeft: 8,
  },
  footer: {
    marginTop: 16,
    fontSize: 13,
    color: "#999",
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  signUp: {
    color: "#c46986", // rose
    fontWeight: "700", // gras
  },

  errorBox: {
    backgroundColor: "rgba(255,0,0,0.15)",
    borderWidth: 1,
    borderColor: "#ff4d4d",

    paddingVertical: 12,
    paddingHorizontal: 16,

    borderRadius: 12,

    marginVertical: 12,
    marginHorizontal: 20,

    alignSelf: "stretch",
  },

  errorText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
});

export default styles;
