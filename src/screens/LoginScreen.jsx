import React, { useContext, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AuthContext from '../context/AuthContext';
import styles, { COLORS } from '../styles/login';

export default function LoginScreen() {
    const { login } = useContext(AuthContext);

    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 6,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -6,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, []);


    return (
        <LinearGradient
            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
            style={styles.background}
        >
            <View style={styles.card}>

                <Animated.View
                    style={[
                        styles.iconCircle,
                        { transform: [{ translateX }] },
                    ]}
                >
                    <Ionicons name="train" size={32} color="#FFF" />
                </Animated.View>

                <Text style={styles.title}>Candy Train</Text>
                <Text style={styles.subtitle}>Welcome!</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={18} color={COLORS.primary} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={COLORS.placeholder}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={18} color={COLORS.primary} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={COLORS.placeholder}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={login}>
                    <LinearGradient
                        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.footer}>
                    No account yet? <Text style={styles.link}>Sign up</Text>
                </Text>

            </View>
        </LinearGradient>
    );
}
