import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';
import Button from '../../Button';

//default values
import defaultLengths from '../../../consts/DefaultLengths';

export default function RoomDetails(props) {

    //prpos
    let { modalVisible, setModalVisible, roomType } = props;

    const [walls, setWalls] = useState([
        {
            length: defaultLengths[roomType].length,
            alignment: 'horizontal',
            internalWallWidth: '90'
        }
    ]);

    useEffect(() => {
        setWalls([
            {
                length: defaultLengths[roomType].length,
                alignment: 'horizontal',
                internalWallWidth: '90'
            }
        ])
    }, [roomType])

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
                            Please Enter Room Details
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
                        <ScrollView>
                            {
                                walls.map((wall, index) => {
                                    return (
                                        <View style={{ marginTop: 10 }} key={index}>
                                            <View style={styles.roomDetailsContainer}>
                                                <Text style={styles.labelText}>Wall {index + 1} - Length(mm)</Text>
                                                <Text style={styles.labelText}>Internal wall{index + 1} width - (mm)</Text>
                                                <Text style={styles.labelText}>Wall {index + 1} - Alignment</Text>
                                            </View>
                                            <View style={styles.roomDetailsContainer}>
                                                <TextInput
                                                    style={[styles.textInput]}
                                                    placeholder="Length in mm"
                                                    autoCapitalize="none"
                                                    keyboardType="number-pad"
                                                    value={walls[index].length}
                                                    onChangeText={(text) => handleLength(text, index)}
                                                />
                                                <TextInput
                                                    style={[styles.textInput]}
                                                    placeholder="Length in mm"
                                                    autoCapitalize="none"
                                                    keyboardType="number-pad"
                                                    value={walls[index].internalWallWidth}
                                                    onChangeText={(text) => handleWallWidth(text, index)}
                                                />
                                                <View style={styles.nextWallContainer}>
                                                    <TouchableOpacity
                                                        style={[styles.nextWallButton, { backgroundColor: wall.alignment === 'vertical' ? Colors.primaryLight : Colors.textLight }]}
                                                        onPress={() => { toggleNextWall(index, 'vertical') }}
                                                    >
                                                        <Text>Vertical</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[styles.nextWallButton, { backgroundColor: wall.alignment === 'horizontal' ? Colors.primaryLight : Colors.textLight }]}
                                                        onPress={() => { toggleNextWall(index, 'horizontal') }}
                                                    >
                                                        <Text>Horizontal</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[styles.deleteWall]}
                                                        onPress={() => deleteCurrentWall(index)}
                                                    >
                                                        <FontAwesome
                                                            name="minus"
                                                            color={Colors.textLight}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style={styles.plusButtonContainer}>
                                <TouchableOpacity
                                    style={styles.plusButton}
                                    onPress={() => { generateNewWall() }}
                                >
                                    <FontAwesome
                                        name="plus"
                                        color={Colors.textLight}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="DONE"
                                    onPress={submitRoomDetails}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
    function handleWallWidth(width, index) {
        let newWalls = walls.slice();
        newWalls[index].internalWallWidth = width;
        setWalls(newWalls);
    }
    function handleLength(length, index) {
        let newWalls = walls.slice();
        newWalls[index].length = length;
        setWalls(newWalls);
    }
    function generateNewWall() {
        let newWalls = walls.slice();
        newWalls.push({
            length: defaultLengths[roomType].length,
            alignment: 'horizontal',
            internalWallWidth: '90'
        });
        setWalls(newWalls);
    }
    function deleteCurrentWall(index) {
        let newWalls = walls.slice();
        if (newWalls.length > 1) {
            newWalls.splice(index, 1);
            setWalls(newWalls);
        }
        else alert("Your room must have one wall to continue!!")
    }
    function toggleNextWall(index, type) {
        let newWalls = walls.slice();
        newWalls[index].alignment = type;
        setWalls(newWalls);
    }
    function submitRoomDetails() {
        let validated = true;
        for (const wall of walls) {
            if (wall.length === '') {
                alert("Please input length of all walls");
                validated = false;
                break;
            }
            else if (wall.internalWallWidth === '') {
                alert("Please input internal widths of all walls;");
                validated = false;
                break;
            }
        }
        if (validated) {
            props.generateRoom({ walls: walls });
            setWalls([
                {
                    length: defaultLengths[roomType].length,
                    alignment: 'horizontal',
                    internalWallWidth: '90'
                }
            ]);
            setModalVisible(false);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        top: '10%',
        elevation: 5,
    },
    contet: {
        height: '60%',
        width: '80%',
        backgroundColor: '#fff',
        paddingBottom: 100,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    heading: {
        color: Colors.textDark,
        fontSize: 22
    },
    body: {
        marginTop: 20,
        backgroundColor: '#fff',
        // marginBottom: 20,
        padding: 20
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
    textInput: {
        height: 35,
        width: '22%',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0,
        marginLeft: '2%'
    },
    roomDetailsContainer: {
        flexDirection: 'row'
    },
    labelText: {
        color: Colors.textDark,
        width: '22%',
        marginLeft: '2%',
    },
    nextWallContainer: {
        marginLeft: '2%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: '#a0a',
        width: '48%'
    },
    nextWallButton: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
    },
    deleteWall: {
        backgroundColor: Colors.danger,
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10
    },
    plusButtonContainer: {
        marginTop: 30,
        alignItems: 'flex-end'
    },
    plusButton: {
        height: 50,
        width: 50,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'flex-end',
    }
})