import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

//draggable, rotatable, zoomable
import ElementContainer from './ElementContainer';

import Colors from '../../../common/consts/Colors';

export default function CurvedArrow(props) {

    return (
        <View style={{ alignItems: 'center' }}>

            <ElementContainer
                {...props}
                isDraggable={true}
                isRotate={false}
                isScalable={false}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onLongPress={() => {
                        // setShowRoomOptions(previousState => !previousState);
                        // setShowOptions(previousState => !previousState);
                    }}
                    style={styles.curvedArrowContainer}
                >
                    <Image
                        source={require('../../../assets/curvedArrow.png')}
                        style={styles.curvedArrow}
                    />
                </TouchableOpacity>
            </ElementContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    curvedArrow: {
        height: 50,
        width: 60
    },
    optionsContainer: {
        padding: 5,
        // flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 360,
        justifyContent: 'center',
        position: 'absolute',
        maxHeight: 300
    },
    optionButton: {
        backgroundColor: Colors.textDark,
        // padding: 30,
        marginTop: 10,
        marginLeft: 10,
        // paddingHorizontal: 20,
        borderRadius: 4,
        width: 60,
        height: 60,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    optionActive: {
        backgroundColor: Colors.primary
    }
})