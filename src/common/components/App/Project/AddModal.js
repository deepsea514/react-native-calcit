import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Switch, Dimensions } from 'react-native';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

export default function AddModal(props) {

    //prpos
    let { modalVisible, setModalVisible, setRoomDetailsVisible, setRoomType, setAskRoomDefaultVisible, generateDefaultRoom } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
            pointerEvents = {'auto'}
        >
            <View style={styles.container}>
                <View style={styles.contet}>
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
                    <View style={styles.body}>
                        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
                            <TouchableOpacity
                                // onPress={() => { addRoom('kitchen') }}
                                onLongPress={(evt) => { addRoomDraggable(evt, 'kitchen') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="spoon"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Kitchen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('dining') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'dining') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Dining</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('living') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'living') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Living</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('rumpus') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'rumpus') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Rumpus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('bathroom') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'bathroom') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Bathroom</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('ensuite') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'ensuite') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Ensuite</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('toilet') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'toilet') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Toilet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('laundry') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'laundry') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Laundry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('bedroom') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'bedroom') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Bedroom</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('wir') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'wir') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>WIR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('robe') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'robe') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Robe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('garage') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'garage') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="trash"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Garage</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('hall') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'hall') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Hall</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('alfresco') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'alfresco') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Alfresco</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('deck') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'deck') }}
                                style={[styles.listContainer]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Deck</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { addRoom('custom') }}
                                // onLongPress={(evt) => { addRoomDraggable(evt, 'custom') }}
                                style={[styles.listContainer, styles.back]}>
                                <FontAwesome
                                    name="bed"
                                    color={Colors.textDark}
                                    size={17}
                                />
                                <Text style={styles.text}>Custom</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
    function addRoom(type) {
        setModalVisible(false);
        setRoomType(type);
        generateDefaultRoom(type);
        // setAskRoomDefaultVisible(true);
        // setRoomDetailsVisible(true);
    }
    function addRoomDraggable(evt, type) {
        let glX = evt.nativeEvent.pageX;
        let glY = evt.nativeEvent.pageY;
        let rlX = glX - Dimensions.get('window').width / 2;
        let rlY = glY - Dimensions.get('window').height / 2;
        // console.log(rlX, rlY);
        // console.log(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
        setModalVisible(false);
        setRoomType(type);
        generateDefaultRoom(type, "", "", {x: rlX, y: rlY})
    }
}

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
        height: '50%',
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
    }
})