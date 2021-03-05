import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

//icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//consts
import Colors from '../../../consts/Colors';

export default function IconButton({ icon, containerStyle, title, onPress, inverse }) {
    return (
        <View style={styles.containerOverall}>
            <TouchableOpacity
                style={[styles.container, containerStyle, inverse ? styles.inverse : null]}
                onPress={onPress ? onPress : null}
            >
                <FontAwesome
                    name={icon ? icon : 'plus'}
                    color={inverse ? Colors.primary : '#fff'}
                    size={18}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
    containerOverall: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inverse: {
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 12
    }
})