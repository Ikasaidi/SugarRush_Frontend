import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/tab";

export default function TabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    navigation.navigate(route.name);
                };

                let iconName;
                if (route.name === 'Schedule') iconName = 'calendar';
                if (route.name === 'My QR') iconName = 'qr-code';
                if (route.name === 'Tickets') iconName = 'ticket';
                if (route.name === 'Profile') iconName = 'person';

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tab}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                isFocused && styles.iconContainerActive,
                            ]}
                        >
                            <Ionicons
                                name={iconName}
                                size={22}
                                color={isFocused ? '#FFFFFF' : '#9CA3AF'}
                            />
                        </View>

                        <Text
                            style={[
                                styles.label,
                                isFocused && styles.labelActive,
                            ]}
                        >
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


