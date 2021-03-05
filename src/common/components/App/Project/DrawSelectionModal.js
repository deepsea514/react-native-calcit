import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

//slider import
import Slider from '@react-native-community/slider';

//color picker
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

//consts
import Colors from '../../../consts/Colors';

//custom components
import Button from '../../Button';

export default function DrawModal({ modalVisible, setModalVisible, type, setFreeDrawStroke, setFreeDrawColor, setSprayDrawStroke, setSprayDrawColor, setSprayDrawDensity, setEraserStroke, generateEraser, generateFreeDraw, generateSprayDraw }) {

    const [selectedColor, setSelectedColor] = useState('#000000');  //default free draw color
    const [strokeSize, setStrokeSize] = useState(4);    //default stroke size free draw
    const [sprayStrokeSize, setSprayStrokeSize] = useState(4); // default stroke size spray draw
    const [spraySelectedColor, setSpraySelectedColor] = useState('#000000'); // default spray draw color
    const [densitySize, setDensitySize] = useState(4);  //default density size spray draw
    const [eraserStrokeSize, setEraserStrokeSize] = useState(4);    //default stroke size eraser

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

                    {/* modal header */}
                    <View style={styles.header}>
                        <Text style={styles.heading}>
                            Stroke Settings
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

                    {/* modal body */}
                    <View style={styles.body}>
                        {
                            type === 'freeDraw' ? renderFreeDrawType() : type === 'sprayTool' ? renderSprayDrawType() : renderEraserType()
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )

    //eraser type
    function renderEraserType() {
        return (
            <>
                {/* slider selection for stroke size */}
                <Slider
                    minimumValue={1}
                    maximumValue={50}
                    style={{ height: 40 }}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    value={eraserStrokeSize}
                    onValueChange={(value) => { setEraserStrokeSize(value) }}   //setting the value to state
                />
                {/* displaying the current */}
                {/* stroke size */}
                <View style={styles.dotContainer}>
                    <Text style={styles.selectedText}>Selected Stroke ({eraserStrokeSize.toFixed(2)}): </Text>
                    <View style={[styles.dot, { height: eraserStrokeSize, width: eraserStrokeSize, borderRadius: eraserStrokeSize / 2, backgroundColor: '#eee' }]} />
                </View>
                {/* submitbutton */}
                <Button
                    containerStyle={{ marginTop: 30 }}
                    onPress={() => {
                        setEraserStroke(eraserStrokeSize);  //setting the value to state(parent)
                        generateEraser();   //generating the output
                        setModalVisible(false); //setting modal visible false
                    }}
                    title="DONE"
                />
            </>
        )
    }

    //free draw selections
    function renderFreeDrawType() {
        return (
            <>
                {/* slider selection for stroke size */}
                <Slider
                    minimumValue={1}
                    maximumValue={20}
                    style={{ height: 40 }}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    value={strokeSize}
                    onValueChange={(value) => { setStrokeSize(value) }} //setting the value to state
                />
                {/* color picker for color selection */}
                <TriangleColorPicker
                    onColorChange={(color) => { setSelectedColor(fromHsv(color)) }}
                    hideControls    //hiding controls because isn't required for our flow
                    style={{ height: 150 }}
                    defaultColor={selectedColor}
                />
                <View style={styles.buttonContainer}>
                    {/* displaying the current selections */}
                    {/* stroke and color */}
                    <View style={styles.dotContainer}>
                        <Text style={styles.selectedText}>Selected Color & Stroke ({strokeSize.toFixed(2)}): </Text>
                        <View style={[styles.dot, { height: strokeSize, width: strokeSize, borderRadius: strokeSize / 2, backgroundColor: selectedColor }]} />
                    </View>
                    {/* submit button */}
                    <Button
                        containerStyle={{ marginTop: 30 }}
                        onPress={() => {
                            setFreeDrawColor(selectedColor);    //setting the free draw color
                            setFreeDrawStroke(strokeSize);      //setting the stroke size
                            generateFreeDraw();                 //generating the free draw output
                            setModalVisible(false);             //setting the modal visible false
                        }}
                        title="DONE"
                    />
                </View>
            </>
        )
    }
    //spray draw selections
    function renderSprayDrawType() {
        return (
            <>
                {/* slider selection for stroke size */}
                <Slider
                    minimumValue={1}
                    maximumValue={20}
                    style={{ height: 40 }}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    value={sprayStrokeSize}
                    onValueChange={(value) => { setSprayStrokeSize(value) }} //setting the value to state
                />
                <Slider
                    minimumValue={1}
                    maximumValue={100}
                    style={{ height: 40 }}
                    minimumTrackTintColor={Colors.primary}
                    thumbTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    value={densitySize}
                    onValueChange={(value) => { setDensitySize(value) }} //setting the value to state
                />
                {/* color picker for color selection */}
                <TriangleColorPicker
                    onColorChange={(color) => { setSpraySelectedColor(fromHsv(color)) }}
                    hideControls    //hiding controls because isn't required for our flow
                    style={{ height: 150 }}
                    defaultColor={spraySelectedColor}
                />
                <View style={styles.buttonContainer}>
                    {/* displaying the current selections */}
                    {/* stroke and color */}
                    <View style={styles.dotContainer}>
                        <Text style={styles.selectedText}>Stroke ({sprayStrokeSize.toFixed(2)}) & Density ({densitySize.toFixed(2)}) </Text>
                        {/* <View style={[styles.dot, { height: strokeSize, width: strokeSize, borderRadius: strokeSize / 2, backgroundColor: selectedColor }]} /> */}
                    </View>
                    {/* submit button */}
                    <Button
                        containerStyle={{ marginTop: 30 }}
                        onPress={() => {
                            setSprayDrawColor(spraySelectedColor);    //setting the free draw color
                            setSprayDrawStroke(sprayStrokeSize);      //setting the stroke size
                            setSprayDrawDensity(densitySize);
                            generateSprayDraw();                 //generating the free draw output
                            setModalVisible(false);             //setting the modal visible false
                        }}
                        title="DONE"
                    />
                </View>
            </>
        )
    }
}

//modal styles
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
        width: '75%',
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        // justifyContent: 'space-around'
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
    mw80: {
        maxWidth: '80%'
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        minHeight: 50
    },
    dot: {
        height: 40,
        width: 40,
        backgroundColor: '#a0a',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    selectedText: {
        fontSize: 16,
        marginRight: 10
    }
})