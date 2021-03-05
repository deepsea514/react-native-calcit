import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useMemoOne } from 'use-memo-one'

//list of textures
import Materials from '../../../../consts/MaterialTypes';

//redux imports
import { connect } from 'react-redux';
import { setMaterialType } from '../../../../../actions/OptionActions';
import Colors from '../../../../consts/Colors';

function MaterialsBar({ setMaterialTypeNow, itemMaterialTypes, showOptions }) {

    useEffect(() => {
        //checking if user wants to 
        //open the texture bar or not
        if (showOptions.selectedOption === 'mType') openTexturesBar();
        else closeTexturesBar();
    }, [showOptions.selectedOption]);

    // const barTranslate = new Animated.Value(100);
    const { barTranslate } = useMemoOne(() => ({
        barTranslate: new Animated.Value(100)
    }), []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { setItemMaterial(item) }}
        >
            <View
                style={[styles.box, {
                    backgroundColor: itemMaterialTypes[showOptions.id] === item.title ? Colors.primary : '#bbb'
                }]}
            >
                <View style={styles.textOpacity}>
                    <Text style={styles.itemName}>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <Animated.View
            style={[styles.container, {
                transform: [
                    {
                        translateX: barTranslate
                    }
                ]
            }]}
        >
            <View style={styles.content}>
                <FlatList
                    data={Materials}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        </Animated.View>
    )
    function setItemMaterial(item) {
        let { id } = showOptions;
        setMaterialTypeNow({
            ...itemMaterialTypes,
            [id]: item.title
        });
    }
    function openTexturesBar() {
        Animated.spring(barTranslate, {
            toValue: 0,
            friction: 10,
            useNativeDriver: true
        }).start();
    }
    function closeTexturesBar() {
        Animated.spring(barTranslate, {
            toValue: 100,
            friction: 10,
            useNativeDriver: true
        }).start();
    }
}

const mapStateToProps = () => state => ({
    itemMaterialTypes: state.Options.itemMaterialTypes,   //local material types
    showOptions: state.Options.showOptions  //current options
});

const mapDispatchToProps = () => dispatch => ({
    setMaterialTypeNow: (type) => dispatch(setMaterialType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsBar);


//styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: 100,
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        // height: '70%',
        width: '100%',
        bottom: 30,
        ...Platform.select({
            android: {
                bottom: 40
            }
        }),
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 20
    },
    box: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        paddingBottom: 10,
        backgroundColor: Colors.primary
    },
    itemName: {
        fontSize: 12,
        textAlign: 'center',
        color: Colors.textLight
    },
    textOpacity: {
        padding: 2,
        // backgroundColor: '#ffffff55',
        borderRadius: 4
    }
})