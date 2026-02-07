import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F1F1',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    iconContainerActive: {
        backgroundColor: '#EC6A8E',
    },
    label: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    labelActive: {
        color: '#EC6A8E',
        fontWeight: '600',
    },
});
