import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

//constants
import Colors from '../../../consts/Colors';

export default function CanvasLoader() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/wait.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View>
                    <ActivityIndicator
                        size="large"
                        color={Colors.primary}
                    />
                </View>
                <Text style={styles.text}>Please wait while we are making the canvas ready for you!!</Text>
            </View>
        )
    }
    else return null;
}

//styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '50%',
        width: '50%',
    },
    text: {
        textAlign: 'center',
        marginTop: 15
    }
})