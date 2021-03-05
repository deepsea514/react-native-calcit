import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

//redux imports
import { connect } from 'react-redux';
import { setShowOptions, setDimensions } from '../../../../actions/OptionActions';
import Button from '../../Button';

function DimensionsModal(props) {

    //prpos
    let { modalVisible, setModalVisible, dimensions, showOptions, setDimensions } = props;

    const { id } = showOptions;

    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    useEffect(() => {
        if (modalVisible) {
            setHeight(dimensions[id]?.height ? dimensions[id].height : '');
            setWidth(dimensions[id]?.width ? dimensions[id].width : '');
        }
    }, [modalVisible]);

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
                            Add Dimensions
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
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={styles.labelText}>Height(mm)</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder="Example - 2500"
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        maxLength={5}
                                        onChangeText={(text) => { setHeight(text) }}
                                        value={height}
                                    />
                                </View>

                                <View>
                                    <Text style={styles.labelText}>Width(mm)</Text>
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder="Example - 1000"
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                        maxLength={5}
                                        onChangeText={(text) => { setWidth(text) }}
                                        value={width}
                                    />
                                </View>
                            </View>
                            <Button
                                title="SAVE"
                                containerStyle={{
                                    width: 80,
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
                                    marginRight: 25
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
        setDimensions({
            ...dimensions,
            [id]: {
                height: height,
                width: width
            }
        });
        setHeight('');
        setWidth('');
        setModalVisible(false);
    }
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions,
    dimensions: state.Options.dimensions
});

const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options)),
    setDimensions: (dimensions) => dispatch(setDimensions(dimensions))
})

export default connect(mapStateToProps, mapDispatchToProps)(DimensionsModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",

        paddingTop: '10%',
        backgroundColor: '#ffffff44'
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
    listContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})