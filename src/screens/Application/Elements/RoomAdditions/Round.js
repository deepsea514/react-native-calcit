import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Round() {
    return (
        <View style={styles.container}>
            <View style={[styles.element]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    element: {
        position: 'absolute',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#000',
    }
})