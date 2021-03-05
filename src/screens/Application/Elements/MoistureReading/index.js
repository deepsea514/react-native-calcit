//this is a common resuable component for both
//1. Moisture readings
//2. Photo ref readings

//This tranfsformation is dependent on a single variable 
//named => photoRef, passed from props while generating this component in Project.js file

import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//constants
import Colors from '../../../../common/consts/Colors';

//drag
import ElementContainer from '../ElementContainer';

// reading modal
import Reading from './Reading';

//redux imports
import { connect } from 'react-redux';

function MoistureReading(props) {

    const [modalVisible, setModalVisible] = useState(false);

    let {
        // states
        moistureReadings,
        photorefReadings,

        // variable
        photoRef,
    } = props;

    let reading = getReading();
    const iconName = photoRef ? 'camera' : 'tint';

    function getReading() {
        //conditions for using the state
        let value;
        if (photoRef)
            value = photorefReadings[props.id] || '0';
        else
            value = moistureReadings[props.id] || '0';

        return value;
    }

    return (
        <Fragment>
            <ElementContainer
                {...props}
                isDraggable={true}
                isRotate={false}
            >
                <TouchableOpacity
                    style={
                        [styles.container, {
                            borderRadius: photoRef ? 4 : 15,
                        }]
                    }
                    activeOpacity={0.8}
                    onPress={() => { setModalVisible(true) }}
                >
                    <Text style={styles.text}>{reading}</Text>
                    <FontAwesome
                        name={iconName}
                        size={10}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </ElementContainer>
            <Reading
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                id={props.id}
                photoRef={photoRef}
            />
        </Fragment>
    )
}

const mapStateToProps = () => state => ({
    moistureReadings: state.Options.moistureReadings,   //moisture state
    photorefReadings: state.Options.photorefReadings    //photo ref state
});

export default connect(mapStateToProps)(MoistureReading);

const styles = StyleSheet.create({
    container: {
        minHeight: 30,
        minWidth: 30,
        flexDirection: 'row',
        backgroundColor: Colors.textLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icon: {
        marginTop: -10,
        color: Colors.textDark,
        marginLeft: 2
    },
    text: {
        fontSize: 11
    }
})