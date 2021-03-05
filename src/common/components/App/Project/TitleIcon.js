//===========documentation============//

//1. Title: string, optional, default ''
//2. onPress: function, optional, null
//3. icon: string, optional, default: pencil, from fontawesome

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//consts
import Colors from '../../../consts/Colors';

FontAwesome.loadFont()
import FontAwesome5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';


export default function TitleIcon({ title, onPress, icon, selected, onLongPress, containerStyles, iconStyles }) {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyles]}
            onPress={onPress ? onPress : null}
            onLongPress={onLongPress ? onLongPress : null}
        >
            <Text style={styles.textStyles}>
                {title ? title : ''}
            </Text>
            <View style={[styles.box, selected && styles.selectedbox]}>
                {icon == 'spray-can' ? <FontAwesome5
                    name={icon ? icon : 'pencil'}
                    color={selected ? Colors.textLight : Colors.primary}
                    size={20}
                    style={[iconStyles]}
                /> : <FontAwesome
                    name={icon ? icon : 'pencil'}
                    color={selected ? Colors.textLight : Colors.primary}
                    size={20}
                    style={[iconStyles]}
                />}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    textStyles: {
        marginBottom: 3,
        fontSize: 13
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedbox: {
        backgroundColor: Colors.primary
    }
})