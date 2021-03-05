import React, { useState } from 'react';

import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

//custom components
import IconButton from '../../../common/components/App/Project/IconButton';

//consts
import Colors from '../../../common/consts/Colors';

//draggable, rotateable, zoomable
import ElementContainer from './ElementContainer';

export default function TextElem({ setIsDragging, setIsDraggingIndex, setIsElementTrashable, id, setZoomDeleteIcon }) {

    const [isTextInput, setIsTextInput] = useState(false);
    const [text, setText] = useState('Long Press to Edit');

    return (
        <ElementContainer
            setIsDragging={setIsDragging}
            setIsDraggingIndex={setIsDraggingIndex}
            setIsElementTrashable={setIsElementTrashable}
            setZoomDeleteIcon={setZoomDeleteIcon}
            id={id}
            isDraggable={true}
        >
            {
                !isTextInput ? (
                    <View style={styles.textContainer}>
                        <Pressable
                            onPressIn={() => { setIsDragging(true) }}
                            onLongPress={() => { showTextInput(); setIsDragging(false) }}>
                            <Text>
                                {text}
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={text}
                                onChangeText={(value) => { setText(value) }}
                                placeholder="Text"
                            />
                            <IconButton
                                icon="save"
                                containerStyle={{ padding: 3, marginLeft: 3 }}
                                onPress={hideTextInput}
                            />
                        </View>
                    )
            }
        </ElementContainer>
    )
    function hideTextInput() {
        //user must enter a text 
        //to save the input
        if (text !== '') setIsTextInput(false);
        else alert("Please input a text.")
    }
    function showTextInput() {
        setIsTextInput(true);
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: Colors.textDark,
        width: 100,
        borderRadius: 4,
        padding: 2,
        backgroundColor: '#fff',
        margin: 0,
        height: 26
    },
    textInputContainer: {
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        padding: 5,
    }
})