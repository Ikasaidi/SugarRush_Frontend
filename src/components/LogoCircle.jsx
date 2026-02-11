import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/signup';

export default function LogoCircle() {
  return (
    <View style={styles.logoCircle}>
      <Ionicons name="train" size={28} color="#FFF" />
    </View>
  );
}
