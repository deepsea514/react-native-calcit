import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Robe() {
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
        height: 5,
        width: '100%',
        backgroundColor: '#000',
    }
})