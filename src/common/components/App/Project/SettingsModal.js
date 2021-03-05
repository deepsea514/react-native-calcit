import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

export default function SettingsModal({ modalVisible, setModalVisible }) {

    const [isEnabled, setIsEnabled] = useState(false);

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
                            Settings
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
                            <View style={[styles.listContainer]}>
                                <Text style={styles.mw80}>Internal Wall Width</Text>
                                <Text>90mm</Text>
                            </View>
                            <View style={[styles.listContainer, styles.back]}>
                                <Text style={styles.mw80}>External Cladding Type</Text>
                                <Text>90mm</Text>
                            </View>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.mw80}>Ceiling height</Text>
                                <Text>2400mm</Text>
                            </View>
                            <View style={[styles.listContainer, styles.back]}>
                                <Text style={styles.mw80}>Unit of Measurement</Text>
                                <Text>Metric</Text>
                            </View>
                            <View style={[styles.listContainer]}>
                                <Text style={styles.mw80}>Show Measurements</Text>
                                <Text>No</Text>
                            </View>
                            <View style={[styles.listContainer, styles.back]}>
                                <Text style={styles.mw80}>Show Internal and External Guides</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: Colors.primary }}
                                    thumbColor={isEnabled ? '#fff' : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { setIsEnabled(previousState => !previousState) }}
                                    value={isEnabled}
                                    style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
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
        height: '80%',
        width: '80%',
        backgroundColor: '#fff',
        padding: 20
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
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    back: {
        backgroundColor: '#eee'
    },
    mw80:{
        maxWidth: '80%'
    }
})