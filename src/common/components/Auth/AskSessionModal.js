import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../consts/Colors';
import Button from '../Button';

Entypo.loadFont();

export default function AskSessionModal({ modalVisible, setModalVisible, appLogin }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                // onPress={() => setModalVisible(false)}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Session Alert!!
                        </Text>
                        <Entypo
                            name="circle-with-cross"
                            size={25}
                            color={Colors.danger}
                        />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.message}>Previous Session already exists. Do you want to continue with the previous session?</Text>
                    </View>
                    <View style={styles.footer}>
                        <Button
                            title="Cancel"
                            onPress={() => { setModalVisible(false) }}
                            mode="outlined"
                            textStyle={{ fontSize: 12 }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Button
                                title="Continue"
                                textStyle={{ fontSize: 13 }}
                                onPress={appLogin}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderRadius: 20
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
        marginBottom: 20
    },
    message: {
        color: Colors.textDark
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})