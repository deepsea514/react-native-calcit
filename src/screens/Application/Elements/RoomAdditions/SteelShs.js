import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Round() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/items/carpentry/shsPost.png')}
                style={styles.element}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '220%',
        height: '220%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    element: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    }
})