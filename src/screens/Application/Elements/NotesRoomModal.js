import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Platform } from 'react-native';

//custom components
import Button from '../../../common/components/Button';

//constants
import Colors from '../../../common/consts/Colors';

//redux imports
import { connect } from 'react-redux';
import { setNotes as setNotesRedux } from '../../../actions/OptionActions';

function NotesRoomModal({ setModalVisible, modalVisible, notes, setNotes, setParentOptions, showOptions, id, setNotesGlobal, globalNotes }) {

    function closeModal() {
        setModalVisible(false);
        setParentOptions({
            ...showOptions,
            selectedOption: ''
        })
    }

    const [localNotes, setNotesLocal] = useState('');

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
                        <Text style={styles.heading}>Type Notes</Text>
                        <TextInput
                            placeholder="Start typing notes.."
                            style={styles.textInput}
                            defaultValue={notes}
                            onChangeText={(text) => { setNotesLocal(text) }}
                            multiline
                            numberOfLines={4}
                            maxLength={200}
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
                                onPress={() => { saveNotesNow() }}
                                title="Save"
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
        setNotes(localNotes);
        setNotesGlobal({
            ...globalNotes,
            [id]: localNotes
        });
        closeModal();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffcc',
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
                minHeight: 80,
                maxHeight: 100,
                padding: 15,
                paddingTop: 10
            }
        })
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 5
    }
});

const mapStateToProps = () => state => ({
    globalNotes: state.Options.notes
})

const mapDispatchToProps = () => dispatch => ({
    setNotesGlobal: (notes) => dispatch(setNotesRedux(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesRoomModal);