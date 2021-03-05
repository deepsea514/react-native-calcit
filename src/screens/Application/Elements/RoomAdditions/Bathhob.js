import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Bathhob() {
    return (
        <View style={styles.container}>
            <View style={[styles.element]} >
            </View>
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
        height: '100%',
        width: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 1,
    }
})