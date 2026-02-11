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
});
