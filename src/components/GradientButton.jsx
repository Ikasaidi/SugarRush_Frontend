import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../styles/login';

export default function GradientButton({ title, onPress }) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{title}</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </LinearGradient>
        </TouchableOpacity>
    );
}
