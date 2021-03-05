//=====================component documentation=====================//
//1. title: string, optioanl, deafult = ""
//2. onPress: function, optional, deafult null
//3. loading: bool, optional, default false
//4. containerStyle: object, optional
//5. mode: enum default|outlined
//6. textStyle: object optional styles for text

import React from 'react';

//components 
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../consts/Colors';

export default function Button({ title, onPress, loading, containerStyle, mode = "default", textStyle }) {
    return (
        <TouchableOpacity
            onPress={loading ? (null) : (onPress ? onPress : null)}
        >
            <View style={[styles.container, mode === 'outlined' && styles.outline, containerStyle]}>
                {
                    loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                            <Text style={[styles.loginText, mode === 'outlined' && styles.outlinedText, textStyle]}>{title ? title : ''}</Text>
                        )
                }
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
    loginText: {
        color: Colors.textLight,
        fontWeight: '600',
        fontSize: 15
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.primary,
        padding: 9
    },
    outlinedText: {
        color: Colors.primary
    }
})