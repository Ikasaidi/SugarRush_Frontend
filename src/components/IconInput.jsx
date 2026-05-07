import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../styles/login';

export default function IconInput({
  icon,
  placeholder,
  secure = false,
  onChangeText, 
  value,       
}) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry={secure}
        style={styles.input}

        onChangeText={onChangeText} 
        value={value}               // permet de contrôler l’input
      />
    </View>
  );
}