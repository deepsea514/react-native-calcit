import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

//redux imports
import { connect } from 'react-redux';
import { setShowOptions } from '../../../../actions/OptionActions';

function RoomAddition(props) {

    //prpos
    let { modalVisible, setModalVisible, generateRoomAddition, setShowOptions, showOptions } = props;

    const [showColumns, setShowColumns] = useState(false);

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
                            Add
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
                        style={styles.body} >
                        <ScrollView>
                            <TouchableOpacity
                                onPress={() => { addRoom('robe', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Robe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('privacyWall', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Privacy Wall</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('nibWall', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Nib Wall</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('bulkHead', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Bulkhead</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('bathhob', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Bathhob</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('columns', generateRoomAddition, setShowColumns, setModalVisible); setModalVisible(true) }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Columns</Text>
                            </TouchableOpacity>
                            {
                                showColumns && (
                                    <View style={styles.columnsContainer}>
                                        <TouchableOpacity
                                            onPress={() => { addRoom('square', generateRoomAddition, setShowColumns, setModalVisible) }}
                                            style={[styles.column]}
                                        >
                                            <Text style={styles.columnTax}>Square</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { addRoom('round', generateRoomAddition, setShowColumns, setModalVisible) }}
                                            style={[styles.column]}
                                        >
                                            <Text style={styles.columnTax}>Round</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { addRoom('steelShs', generateRoomAddition, setShowColumns, setModalVisible) }}
                                            style={[styles.column]}
                                        >
                                            <Text style={styles.columnTax}>Steel SHS</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            <TouchableOpacity
                                onPress={() => { addRoom('voids', generateRoomAddition, setShowColumns, setModalVisible) }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Voids</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export function addRoom(type, generateRoomAddition, setShowColumns, setModalVisible, isMultiple) {
    if (type === 'robe') {
        const Robe = require('../../../../screens/Application/Elements/RoomAdditions/Robe');
        generateRoomAddition(<Robe.default />, type)
    }
    else if (type === 'privacyWall') {
        const PrivacyWall = require('../../../../screens/Application/Elements/RoomAdditions/PrivacyWall');
        generateRoomAddition(<PrivacyWall.default />, type)
    }
    else if (type === 'nibWall') {
        const NibWall = require('../../../../screens/Application/Elements/RoomAdditions/PrivacyWall');
        generateRoomAddition(<NibWall.default />, type)
    }
    else if (type === 'bulkHead') {
        const BulkHead = require('../../../../screens/Application/Elements/RoomAdditions/BulkHead');
        generateRoomAddition(<BulkHead.default />, type, { dynamic: true })
    }
    else if (type === 'voids') {
        const Voids = require('../../../../screens/Application/Elements/RoomAdditions/Void');
        generateRoomAddition(<Voids.default />, type, { dynamic: true })
    }
    else if (type === 'columns') {
        setShowColumns(previousState => !previousState);
    }
    else if (type === 'round') {
        const Round = require('../../../../screens/Application/Elements/RoomAdditions/Round');
        generateRoomAddition(<Round.default />, type);
        setShowColumns(false);
    }
    else if (type === 'square') {
        const Square = require('../../../../screens/Application/Elements/RoomAdditions/Square');
        generateRoomAddition(<Square.default />, type);
        setShowColumns(false);
    }
    else if (type === 'steelShs') {
        const SteelShs = require('../../../../screens/Application/Elements/RoomAdditions/SteelShs');
        generateRoomAddition(<SteelShs.default />, type);
        setShowColumns(false);
    }
    else if (type === 'bathhob') {
        const BathHob = require('../../../../screens/Application/Elements/RoomAdditions/Bathhob');
        generateRoomAddition(<BathHob.default />, type, { dynamic: true });
    }
    setModalVisible(false);
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions
});

const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomAddition);

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
        width: '35%',
        backgroundColor: '#fff',
        padding: 20,
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
    }
})