import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

export default function AskRoomDetailOrDefault(props) {

    //prpos
    let { modalVisible, setModalVisible, setRoomDetailsVisible, setRoomType, generateDefaultRoom } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <View style={styles.container}>
                <View style={styles.contet}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Please Choose
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
                    <View style={styles.body}>
                        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
                            <TouchableOpacity
                                onPress={() => { generateDefaultRoom(); setModalVisible(false) }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="spoon"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Default Room</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { showRoomDetails() }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Room Details</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
    function showRoomDetails(type) {
        setModalVisible(false);
        setRoomDetailsVisible(true);
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contet: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        height: 200,
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
    }
})