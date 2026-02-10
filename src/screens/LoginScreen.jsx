import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AuthContext from '../context/AuthContext';
import styles, { COLORS } from '../styles/login';

import AnimatedLogo from '../components/AnimatedLogo';
import IconInput from '../components/IconInput';
import GradientButton from '../components/GradientButton';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.background}
    >
      <View style={styles.card}>

        <AnimatedLogo />

        <Text style={styles.title}>Candy Train</Text>
        <Text style={styles.subtitle}>Welcome!</Text>

        <IconInput icon="mail-outline" placeholder="Email" />
        <IconInput icon="lock-closed-outline" placeholder="Password" secure />

        <GradientButton title="Sign In" onPress={login} />

        <Text style={styles.footer}>
          No account yet? <Text style={styles.link}>Sign up</Text>
        </Text>

      </View>
    </LinearGradient>
  );
}
