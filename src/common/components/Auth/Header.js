import React from 'react';

//components
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../consts/Colors';

export default function Header(){
    return(
        <View style={[styles.container]}>
            {/* logo will be rendered */}
            <Image 
                source={require('../../../assets/logo.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: Colors.primary,
        width: '100%'
    },
    image:{
        height: 150,
        width: 150
    }
})