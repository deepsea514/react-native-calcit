import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function RotateText({ styles, rotateStr }) {

    const [rotateDipslay, setRotateDisplay] = useState('0');

    rotateStr.addListener((progress) => {
        let { value } = progress;
        value = value.replace('deg', '');
        value = Math.ceil(value / 5) * 5;
        if (value !== rotateDipslay) setRotateDisplay(value);
    });

    return (
        <View style={styles.degreeTextContainer}>
            <Text style={styles.degreeText}>{rotateDipslay}</Text>
            <Text style={styles.degree}>°</Text>
        </View>
    )
}