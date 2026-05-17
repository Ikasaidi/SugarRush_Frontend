import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../styles/login';

export default function IconInput({
  icon,
  placeholder,
  secure = false,
  onChangeText,
  value,
  keyboardType,
  onBlur,
  error,
  editable = true,
}) {
  const [visible, setVisible] = useState(false);

  const formatPhone = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0,3)}-${digits.slice(3)}`;
    return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
  };

  const handleChange = (text) => {
    if (keyboardType === 'phone-pad' || icon === 'call-outline') {
      onChangeText && onChangeText(formatPhone(text));
    } else {
      onChangeText && onChangeText(text);
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={secure && !visible}
          style={styles.input}
          onChangeText={handleChange}
          value={value}
          keyboardType={keyboardType}
          onBlur={onBlur}
          editable={editable}
        />

        {secure ? (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Ionicons
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={COLORS.placeholder}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text
          style={{
            color: '#D64545',
            alignSelf: 'flex-start',
            marginTop: -8,
            marginBottom: 8,
            marginLeft: 6,
            fontSize: 12,
            fontWeight: '600',
          }}
        >
          {error}
        </Text>
      ) : null}
    </>
  );
}