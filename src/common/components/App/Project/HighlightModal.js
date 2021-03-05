import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//consts
import Colors from '../../../consts/Colors';

//highlighters
import Highlighters from '../../../consts/HighlightColors';

export default function DrawModal({ modalVisible, setModalVisible, generateHighlight }) {

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

                    {/* modal header */}
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Highlight Color
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

                    {/* modal body */}
                    <View style={styles.body}>

                        {
                            Highlighters.map((v, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        color={v.name} colorCode={v.color}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
    function ListItem(itemProps) {
        let { color, colorCode } = itemProps;
        return (
            <TouchableOpacity
                style={styles.listContainer}
                onPress={() => {
                    generateHighlight(colorCode)
                    setModalVisible(false);
                }}
            >
                <View style={[styles.highlightLogo, {
                    backgroundColor: color
                }]}>
                    <MaterialCommunityIcons
                        name="format-color-highlight"
                        size={15}
                    />
                </View>
                <Text style={styles.listName}>{color}</Text>
            </TouchableOpacity>
        )
    }
}

//modal styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '55%',
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        // justifyContent: 'space-around'
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
    highlightLogo: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "yellow",
    },
    listName: {
        marginLeft: 10,
        textTransform: 'capitalize',
    }
})