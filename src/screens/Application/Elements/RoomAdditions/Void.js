import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Void() {
    return (
        <View style={styles.container}>
            <View style={[styles.element]} >
                <Text>Void</Text>
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
        borderWidth: 2,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
    }
})