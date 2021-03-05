import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Platform, KeyboardAvoidingView } from 'react-native';

//custom components
import Button from '../../../common/components/Button';

//constants
import Colors from '../../../common/consts/Colors';

//redux imports
import { connect } from 'react-redux';
import { setLabels as setLabelsRedux } from '../../../actions/OptionActions';

function EditRoomLabelModal({ setModalVisible, modalVisible, customRoomType, setRoomType, setParentOptions, showOptions, id, setLabelsGlobal, globalLabels }) {

    function closeModal() {
        setModalVisible(false);
        setParentOptions({
            ...showOptions,
            selectedOption: ''
        })
    }


    const [roomLabel, setRoomLabel] = useState('');

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.container}
                    activeOpacity={1}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        style={styles.labelText}>
                        <Text style={styles.heading}>Edit Label</Text>
                        <TextInput
                            placeholder="Label"
                            style={styles.textInput}
                            defaultValue={customRoomType}
                            onChangeText={(text) => { setRoomLabel(text) }}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Cancel"
                                mode="outlined"
                                onPress={closeModal}
                                containerStyle={{
                                    borderColor: Colors.danger,
                                    padding: 7
                                }}
                                textStyle={{
                                    color: Colors.danger
                                }}
                            />
                            <Button
                                onPress={saveNotesNow}
                                title="Edit"
                                containerStyle={{
                                    marginLeft: 5,
                                    padding: 8
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    )
    function saveNotesNow() {
        setRoomType(roomLabel);
        setLabelsGlobal({
            ...globalLabels,
            [id]: roomLabel
        });
        closeModal();
    }
}

const mapStateToProps = () => state => ({
    globalLabels: state.Options.labels
})

const mapDispatchToProps = () => dispatch => ({
    setLabelsGlobal: (notes) => dispatch(setLabelsRedux(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoomLabelModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffdd',
    },
    labelText: {
        padding: 15,
        width: 300,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 4
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.borderLight,
        marginVertical: 15,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                padding: 15,
            }
        })
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 5
    }
})