import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Robe() {
    return (
        <View style={styles.container}>
            <View style={[styles.element, styles.border]} />
            <View style={[styles.element, styles.topElem]} />
            <View style={[styles.element, styles.bottomElem]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    element: {
        position: 'absolute',
        height: '100%',
        width: 5,
        backgroundColor: '#000',
    },
    border: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    topElem: {
        top: '-25%',
        left: '25%',
        transform: [
            {
                rotate: '90deg'
            },
        ],
        height: '50%',
    },
    bottomElem: {
        transform: [
            {
                rotate: '90deg'
            },
        ],
        bottom: '-25%',
        left: '25%',
        height: '50%',
    }
})