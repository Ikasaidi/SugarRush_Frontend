import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../context/AuthContext';
import LogoCircle from '../components/LogoCircle';
import IconInput from '../components/IconInput';
import GradientButton from '../components/GradientButton';
import PageDots from '../components/PageDots';

import styles from '../styles/signup';

export default function SignupScreen() {
    const { login } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#FF8FB3', '#EC6A8E']}
            style={styles.background}
        >
            <View style={styles.card}>

                <LogoCircle />

                <Text style={styles.title}>Candy Train</Text>
                <Text style={styles.subtitle}>Create your account</Text>

                <IconInput icon="person-outline" placeholder="Username" />
                <IconInput icon="mail-outline" placeholder="Email" />
                <IconInput icon="lock-closed-outline" placeholder="Password" secure />

                <GradientButton
                    title="Create my account"
                    onPress={login}
                />

                <Text style={styles.footer}>
                    Already have an account?{' '}
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Log in
                    </Text>
                </Text>

                <PageDots />

            </View>
        </LinearGradient>
    );
}
