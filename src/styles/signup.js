import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '88%',
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EC6A8E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#B85A7A',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E7A88',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3C2D3',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    width: '100%',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  footer: {
    marginTop: 16,
    fontSize: 13,
    color: '#9E7A88',
  },
  link: {
    color: '#C86B8A',
    fontWeight: '600',
  },
  dots: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0C3D1',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#9BC47C',
  },

  typeContainer: {
  marginTop: 15,
  width: "100%",
},

typeTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#FF8FB3",
  marginBottom: 10,
  textAlign: "center",
},

typeButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  // spacing handled by individual buttons' margin
},

typeButton: {
  flex: 1,
  paddingVertical: 16,
  paddingHorizontal: 14,
  minHeight: 48,
  borderRadius: 30,
  textAlign: "center",
  backgroundColor: "#ffffff",
  color: "#EC6A8E",
  fontWeight: "600",
  borderWidth: 2,
  borderColor: "#FF8FB3",
  overflow: "hidden",
  marginHorizontal: 6,
  justifyContent: "center",
  alignItems: "center",
  fontSize: 15,
  shadowColor: "#FF8FB3",
},

typeButtonText: {
  color: "#EC6A8E",
  fontWeight: "600",
  textAlign: "center",
  includeFontPadding: false,
  textAlignVertical: 'center',
  fontSize: 15,
},

activeType: {
  backgroundColor: "#EC6A8E",
  color: "#ffffff",
  borderColor: "#FF8FB3",
  shadowColor: "#FF8FB3",
  shadowOpacity: 0.4,
  shadowRadius: 8,
  elevation: 4,
  transform: [{ scale: 1.02 }],
},
activeTypeText: {
  color: '#ffffff',
},


errorBox: {
  backgroundColor: "rgba(214, 69, 69, 0.08)",
  borderWidth: 1,
  borderColor: "rgba(214, 69, 69, 0.35)",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  marginTop: 10,
  marginBottom: 14,
  alignSelf: "stretch",
},

errorText: {
  color: "#D64545",
  textAlign: "center",
  fontSize: 13,
  fontWeight: "600",
  lineHeight: 18,
},



});
