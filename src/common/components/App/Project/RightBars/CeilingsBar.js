import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useMemoOne } from 'use-memo-one'

//redux imports
import { connect } from 'react-redux';
import { setCeilingType, setShowOptions } from '../../../../../actions/OptionActions';
import Colors from '../../../../consts/Colors';

const Ceilings = [
    {
        name: 'Normal',
        id: 'normal',
    },
    {
        name: 'Cathedral',
        id: 'cathedral',
    },
    {
        name: 'Raked',
        id: 'raked'
    },
    {
        name: 'Adjust Height',
        id: 'cHeight'
    }
]

function CeilingsBar({ setCeilingType, ceilingType, showOptions, setShowOptions }) {

    useEffect(() => {
        //checking if user wants to 
        //open the texture bar or not
        if (showOptions.selectedOption === 'cType') openCeilingBar();
        else closeCeilingBar();
    }, [showOptions.selectedOption]);

    // const barTranslate = new Animated.Value(100);
    const { barTranslate } = useMemoOne(() => ({
        barTranslate: new Animated.Value(100)
    }), []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                if (item.id === 'cHeight') {
                    setShowOptions({
                        ...showOptions,
                        selectedOption: item.id,
                    })
                }
                else {
                    setRoomCeilingType(item);
                }
            }}
        >
            <View
                style={[styles.box, {
                    backgroundColor: item.id === 'cHeight' ? (
                        Colors.ornage
                    ) : (
                            ceilingType[showOptions.id] === item.id ? Colors.primary : '#bbb'
                        )
                }]}
                source={item.image}
            >
                <View style={styles.textOpacity}>
                    <Text style={styles.itemName}>{item.name}</Text>
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
                    data={Ceilings}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        </Animated.View>
    )
    function setRoomCeilingType(item) {
        let { id } = showOptions;
        setCeilingType({
            ...ceilingType,
            [id]: item.id
        });
    }
    function openCeilingBar() {
        Animated.spring(barTranslate, {
            toValue: 0,
            friction: 10,
            useNativeDriver: true
        }).start();
    }
    function closeCeilingBar() {
        Animated.spring(barTranslate, {
            toValue: 100,
            friction: 10,
            useNativeDriver: true
        }).start();
    }
}

const mapStateToProps = () => state => ({
    ceilingType: state.Options.ceilingType,   //local textures
    showOptions: state.Options.showOptions  //current options
});

const mapDispatchToProps = () => dispatch => ({
    setCeilingType: (ceilingTypes) => dispatch(setCeilingType(ceilingTypes)),
    setShowOptions: (options) => dispatch(setShowOptions(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(CeilingsBar);


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