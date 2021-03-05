import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../../common/consts/Colors';

//custom components
import Button from '../../../../common/components/Button';

//redux imports
import { connect } from 'react-redux';
import { updateOption } from '../../../../actions/OptionActions';

//loadingfont
Entypo.loadFont();

function MoistureReading(props) {

    //prpos
    let {
        modalVisible,
        setModalVisible,

        id, //component uid

        updateOption,

        //states
        moistureReadings,
        photorefReadings,

        //var
        photoRef,
    } = props;

    const title = photoRef ? 'Photo Ref' : 'Moisture';  //title
    const stateName = photoRef ? 'photorefReadings' : 'moistureReadings';   //state name

    //state
    //current reading
    const [reading, setReading] = useState('0');  //inital reading

    useEffect(() => {
        setReading(getReading());   //getting readings according to photoref
    }, [modalVisible]);

    function getReading() {
        //conditions for using the state
        let value;
        if (photoRef) value = photorefReadings[props.id] || '0';
        else value = moistureReadings[props.id] || '0';
        return value;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    setModalVisible(false)
                }}
                activeOpacity={1}
            >
                <TouchableOpacity
                    style={styles.contet}
                    onPress={() => null}
                    activeOpacity={1}
                >
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Add {title} Reading
                        </Text>
                        <TouchableOpacity
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Entypo
                                name="circle-with-cross"
                                size={25}
                                color={Colors.danger}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.body}
                    >
                        <KeyboardAvoidingView enabled behavior="padding">
                            <Text style={styles.labelText}>{title} Reading</Text>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="Example - 10"
                                autoCapitalize="none"
                                keyboardType="numeric"
                                maxLength={5}
                                onChangeText={(text) => { setReading(text) }}
                                value={reading}
                                selectTextOnFocus={true}
                            />
                            <Button
                                title="SAVE"
                                containerStyle={{
                                    width: 80,
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
                                }}
                                onPress={save}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
    function save() {
        let newReadings;
        //photo ref
        if (photoRef) {
            newReadings = {
                ...photorefReadings,  //all other readings  
                [id]: reading        //reading
            }
        }
        //moisture ref
        else {
            newReadings = {
                ...moistureReadings, //all other readings
                [id]: reading       //reading
            }
        }
        updateOption(stateName, newReadings);
        setModalVisible(false);
    }
}

const mapStateToProps = () => state => ({
    moistureReadings: state.Options.moistureReadings,   //moisture state
    photorefReadings: state.Options.photorefReadings    //photo ref state
});

const mapDispatchToProps = () => dispatch => ({
    //update options
    updateOption: (name, value) => dispatch(updateOption(name, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoistureReading);

//stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        shadowColor: "#000",

        paddingTop: '10%',
        backgroundColor: '#ffffff99'
    },
    contet: {
        width: '35%',
        backgroundColor: '#fff',
        padding: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        color: Colors.textDark,
        fontSize: 22
    },
    body: {
        marginTop: 20,
        marginBottom: 20,
    },
    back: {
        backgroundColor: '#eee'
    },
    mw20: {
        // maxWidth: '20%',
    },
    text: {
        marginLeft: 10
    },
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    column: {
        padding: 10,
        backgroundColor: Colors.primary
    },
    columnTax: {
        color: Colors.textLight,
        fontWeight: '600'
    },
    labelText: {
        color: Colors.textDark
    },
    textInput: {
        height: 35,
        width: '100%',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0
    },
})