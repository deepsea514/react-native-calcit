import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Draggable from 'react-native-draggable';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//consts
import Colors from '../../../consts/Colors';

//styles
import styles from '../../../styles/ProjectScreenStyles';

//items
import Items from '../../../consts/Items';

//redux imports
import { connect } from 'react-redux';
import { setShowOptions } from '../../../../actions/OptionActions';


//loading font
MaterialCommunityIcons.loadFont();
FontAwesome5.getStyledIconSet('brand').loadFont();
FontAwesome5.getStyledIconSet('light').loadFont();
FontAwesome5.getStyledIconSet('regular').loadFont();
FontAwesome5.getStyledIconSet('solid').loadFont();

function ItemToolBar({ itemsToolbarTranslate, generateItem, showOptions, setShowOptions }) {

    //scroll ref 
    const scrollRef = useRef(null);

    //states
    const [type, setType] = useState('doors');
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);

    //use effect to set new items
    useEffect(() => {
        // scrollRef.scrollTo(0);
        let newItems = Items[type];
        if (newItems) {
            setItems(newItems);
            setAllItems(newItems);
        }
        else {
            setItems([]);
            setAllItems([]);
        }

        //setting scroll to top
        scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: false });
    }, [type]);


    //search query
    function searchQuery(query) {
        let newItems = allItems.filter(e => e.name.toLowerCase().includes(query.toLowerCase()));
        setItems(newItems);
    }

    return (
        <Animated.View
            style={[styles.itemsToolbarContainer, {
                transform: [
                    { translateY: itemsToolbarTranslate } // toggle between 1000 and 0
                ]
            }]}
        >
            <View style={styles.itemTabBarCotnainer}>
                <View style={styles.itemTabBars}>

                    {/* list of items */}

                    {/* doors */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('doors') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'doors' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="door"
                            color={type === 'doors' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* windows */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('windows') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'windows' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="window-open-variant"
                            color={type === 'windows' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* electrical */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('electrical') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'electrical' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="washing-machine"
                            color={type === 'electrical' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* plumbing */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('plumbing') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'plumbing' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <FontAwesome5
                            name="bath"
                            color={type === 'plumbing' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* air conditioning */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('airConditioning') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'airConditioning' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="air-conditioner"
                            color={type === 'airConditioning' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* carpentry */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('carpentry') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'carpentry' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="sofa"
                            color={type === 'carpentry' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* fire services */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('fireServices') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'fireServices' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="fire-extinguisher"
                            color={type === 'fireServices' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* glazing */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('glazing') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'glazing' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="window-closed-variant"
                            color={type === 'glazing' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>

                    {/* misc */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('misc') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'misc' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="fireplace-off"
                            color={type === 'misc' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>


                    {/* tile tool */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { setType('tileTool') }}
                        style={[styles.bottomItem, { backgroundColor: type === 'tileTool' ? ('#fff') : (Colors.borderLight) }]}
                    >
                        <MaterialCommunityIcons
                            name="checkbox-blank"
                            color={type === 'tileTool' ? Colors.primary : Colors.textDark}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="search"
                        autoCapitalize={false}
                        onChangeText={(text) => { searchQuery(text) }}
                    />
                </View>

            </View>
            <View style={styles.itemsBottomOptions}>
                <ScrollView
                    horizontal  //horizontal scrolling
                    showsHorizontalScrollIndicator={false}  //don't show horizontal scroll indictator
                    ref={scrollRef} //scroll reference
                >
                    {
                        items.map((item, index) => {    //items
                            return (

                                <TouchableOpacity
                                    style={{ flexDirection: 'row' }}
                                    key={index}
                                    onPress={() => {
                                        if (type === 'tileTool') {
                                            handleTileTool(item);
                                        }
                                        else if (type === 'doors' || type === 'windows') {
                                            handleDoorsWindows(item);
                                        }
                                        else {
                                            generateItem(getItem(item.image), item.name, item.image, type, item.id);
                                        }
                                    }}
                                >
                                    <View style={styles.bottomOption}>
                                        <Text>{item.name}</Text>
                                        <Image
                                            source={item.image}
                                            style={{ height: 30, width: 30 }}
                                            resizeMode="contain"
                                        />
                                        <TouchableOpacity
                                            onPress={() => { }}
                                            style={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}
                                        >
                                            <MaterialCommunityIcons
                                                name="heart-outline"
                                                size={14}
                                                color={Colors.danger}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.optionDivider} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Animated.View>
    )

    //handle doors windows
    function handleDoorsWindows(item) {
        if (showOptions.id && showOptions.id.includes('Room')) {
            generateItem(getItem(item.image), item.name, item.image, type, item.id);
        }
        else alretRoomSelection();
    }

    //handle tile tool
    function handleTileTool(item) {
        let { id } = item;
        if (showOptions.id) {
            setShowOptions({
                ...showOptions,
                selectedOption: id
            })
        }
        else alretRoomSelection();
    }

    function alretRoomSelection() {
        Alert.alert(
            "Room Selection",
            "Please select a Room to continue",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "OK", onPress: () => null }
            ],
            { cancelable: false }
        );
    }

    // get item
    function getItem(image) {
        return (
            <Image
                source={image}
                style={{ height: 50, width: 50 }}
                resizeMode="contain"
            />
        )
    }
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions
});

const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options))
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemToolBar);