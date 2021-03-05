import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';
import Button from '../../Button';
import _ from 'lodash';

//redux imports
import { connect } from 'react-redux';
import { setCathedralCeilingHeight, setTileTool } from '../../../../actions/OptionActions';

function CeilingHeightModal(props) {

    //prpos
    let { modalVisible, setModalVisible, currentWall, id, setCathedralCeilingHeight, cathedralCeilingHeights, isTileTool, isSetTileTool, setTileTool, tileTool } = props;

    const [height, setHeight] = useState('');

    useEffect(() => {
        if (modalVisible && !isTileTool) {
            if (cathedralCeilingHeights[id] && cathedralCeilingHeights[id][currentWall]) setHeight(cathedralCeilingHeights[id][currentWall])
            else setHeight('');
        }
        else if (modalVisible && isTileTool) {
            if (isTileTool === 'wallTile') {
                if (tileTool[id] && tileTool[id].height && tileTool[id].type === isTileTool) setHeight(tileTool[id].height[currentWall]);
                else setHeight('');
            }
            else {
                if (tileTool[id] && tileTool[id].height && tileTool[id].type === isTileTool) setHeight(tileTool[id].height);
                else setHeight('');
            }
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
                            Add Height {isTileTool ? `(${_.startCase(isTileTool)} - ${currentWall})` : `Wall - ${currentWall}`}
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
                            <Button
                                title="SAVE"
                                containerStyle={{
                                    width: 80,
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
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
        if (isTileTool) {
            if (isTileTool === 'wallTile') {
                setTileTool({
                    ...tileTool,
                    [id]: {
                        type: isTileTool,
                        height: {
                            ...tileTool[id]?.height,
                            [currentWall]: height
                        }
                    }
                });
            }
            else {
                setTileTool({
                    ...tileTool,
                    [id]: {
                        type: isTileTool,
                        height: height
                    }
                });
            }
        }
        else {
            setCathedralCeilingHeight({
                ...cathedralCeilingHeights,
                [id]: {
                    ...cathedralCeilingHeights[id],
                    [currentWall]: height,
                }
            });
        }
        isSetTileTool(false);
        setModalVisible(false);
        setHeight('');
    }
}

const mapStateToProps = () => state => ({
    dimensions: state.Options.dimensions,
    cathedralCeilingHeights: state.Options.cathedralCeilingHeights,
    tileTool: state.Options.tileTool
});

const mapDispatchToProps = () => dispatch => ({
    setCathedralCeilingHeight: (heights) => dispatch(setCathedralCeilingHeight(heights)),
    setTileTool: (tile) => dispatch(setTileTool(tile))
})

export default connect(mapStateToProps, mapDispatchToProps)(CeilingHeightModal);

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
})