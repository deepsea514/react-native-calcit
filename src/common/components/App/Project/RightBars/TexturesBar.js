import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useMemoOne } from 'use-memo-one'

//list of textures
import Textures from '../../../../consts/Textures';

//redux imports
import { connect } from 'react-redux';
import { setTextures } from '../../../../../actions/OptionActions';

function TexturesBar({ setTexturesNow, textures, showOptions }) {

    useEffect(() => {
        //checking if user wants to 
        //open the texture bar or not
        if (showOptions.selectedOption === 'textures') openTexturesBar();
        else closeTexturesBar();
    }, [showOptions.selectedOption]);

    // const barTranslate = new Animated.Value(100);
    const { barTranslate } = useMemoOne(() => ({
        barTranslate: new Animated.Value(100)
    }), []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { setRoomTexture(item) }}
        >
            <ImageBackground
                style={styles.box}
                source={item.image}
            >
                <View style={styles.textOpacity}>
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            </ImageBackground>
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
                    data={Textures}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        </Animated.View>
    )
    function setRoomTexture(item) {
        let { id } = showOptions;
        setTexturesNow({
            ...textures,
            [id]: item.id
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
    textures: state.Options.textures,   //local textures
    showOptions: state.Options.showOptions  //current options
});

const mapDispatchToProps = () => dispatch => ({
    setTexturesNow: (textures) => dispatch(setTextures(textures)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TexturesBar);


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
        height: '70%',
        width: '100%',
        bottom: 30,
        ...Platform.select({
            android: {
                bottom: 40
            }
        }),
        backgroundColor: '#fff',
        borderRadius: 10
    },
    box: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        paddingBottom: 10
    },
    itemName: {
        fontSize: 10,
        textAlign: 'center'
    },
    textOpacity: {
        padding: 2,
        backgroundColor: '#ffffff55',
        borderRadius: 4
    }
})