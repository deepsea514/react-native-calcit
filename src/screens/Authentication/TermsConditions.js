import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsAndConditionsScreen() {
    return (
        <View style={[styles.container]}>
            <Text>Terms and Conditions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})