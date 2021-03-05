import React, { useState } from 'react';
import { View, ScrollView, Animated, Alert } from 'react-native';

//components
import TitleIcon from './TitleIcon';
import DrawModal from './DrawSelectionModal';
import HighlightModal from './HighlightModal';

//styles
import styles from '../../../styles/ProjectScreenStyles';

export default function Toolbar(props) {

    //generation functions
    let {
        toolBarTranslate,   //animation value for toolbar

        setFreeDrawStroke,  //function to set free draw stroke
        setFreeDrawColor,   //function to set free draw color
        setSprayDrawStroke, //function to set spray draw stroke
        setSprayDrawColor,  //function to set spray draw color
        setSprayDrawDensity,
        setEraserStroke,    //function to set erasor stroke

        generateFreeDraw,   //generating free draw
        generateSprayDraw,  //generating spray draw
        generateEraser,     //generating eraser
        generateArrow,      //generating arrow
        generateCurvedArrow,//generating curved arrow
        generateText,       //generating text
        generateMoisture,   //generating moisture
        generateHighlight,  //generating highlighters
        generatePhotoref,   //generating photo ref
        isGeneratingPDF,    //generating pdf

        canvasRef,          //just a reference for canvas
    } = props;

    //modal states
    const [modalVisible, setModalVisible] = useState(false); //draw modal visible true false
    const [modalType, setModalType] = useState('');     //draw modal type enum freeDraw || eraser
    const [highlightModal, setHighlightModal] = useState(false);    //highligh modal tool

    return (
        <Animated.View style={[styles.toolBarContainer, {
            transform: [{ translateX: toolBarTranslate }]   //animated variable to show hide the toolbar
        }]}>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    alignItems: 'center'
                }}
            >
                {/* photo ref */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Photo Ref"
                        icon="camera"
                        onPress={generatePhotoref}  //photo reference generation
                    />
                </View>
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Moisture"
                        icon="tint"
                        onPress={generateMoisture}
                    />
                </View>
                {/* textool */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Text"
                        icon="text-width"
                        onPress={generateText}
                    />
                </View>
                {/* straight arrow */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Arrow"
                        icon="long-arrow-right"
                        onPress={generateArrow}
                    />
                </View>

                {/* curved arrow */}
                {/* <View style={styles.ml10}>
                    <TitleIcon
                        title="Curved Arrow"
                        icon="long-arrow-right"
                        onPress={generateCurvedArrow}
                    />
                </View> */}

                {/* highlight tool */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Highlight"
                        icon="square"
                        onPress={() => { generateHighlight() }}
                        onLongPress={() => { setHighlightModal(true) }}
                    />
                </View>

                {/* spray tool */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Spray Tool"
                        icon="spray-can"
                        onPress={generateSprayDraw}
                        onLongPress={() => { setModalType('sprayTool'); setModalVisible(true); }}
                    />
                </View>

                {/* free draw */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Free Draw"
                        onPress={generateFreeDraw}
                        onLongPress={() => { setModalType('freeDraw'); setModalVisible(true); }}
                    />
                </View>
                {/* eraser free draw */}
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Eraser"
                        icon="eraser"
                        onPress={generateEraser}
                        onLongPress={() => { setModalType('eraser'); setModalVisible(true); }}
                    />
                </View>
                <View style={[styles.optionDivider, styles.ml10]} />
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Undo"
                        icon="undo"
                        onPress={() => {
                            canvasRef?.current?.undo();
                        }}
                    />
                </View>
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Clear"
                        icon="eraser"
                        onPress={() => {
                            Alert.alert(
                                "Warning",
                                "Are you sure you want to delete all the drawings?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => null,
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => {
                                        const context = canvasRef?.current?.getContext('2d');
                                        context.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height);
                                        // canvasRef?.current?.clear() 
                                    }}
                                ],
                                { cancelable: false }
                            );
                        }}
                        iconStyles={{
                            transform: [
                                {
                                    rotate: '180deg'
                                }
                            ]
                        }}
                    />
                </View>
            </ScrollView>


            {/* draw modal for the stroke and color selection */}
            <DrawModal
                modalVisible={modalVisible} //current visibility
                setModalVisible={setModalVisible}   //set current visibility
                type={modalType}    //current type enum freeDraw || eraser
                setFreeDrawStroke={setFreeDrawStroke}   //setting stroke for free draw
                setFreeDrawColor={setFreeDrawColor}     //setting color for free draw
                setSprayDrawStroke={setSprayDrawStroke} //setting stroke for spray draw
                setSprayDrawColor={setSprayDrawColor}   //setting color for spray draw
                setSprayDrawDensity = {setSprayDrawDensity}
                setEraserStroke={setEraserStroke}       //setting stroke for eraser
                generateFreeDraw={generateFreeDraw}     //generating free draw after all configurations
                generateSprayDraw={generateSprayDraw}   //generating spray draw after all configurations
                generateEraser={generateEraser}         //generating eraser after all configuations
            />
            <HighlightModal
                modalVisible={highlightModal}
                generateHighlight={generateHighlight}
                setModalVisible={setHighlightModal}
            />
        </Animated.View>
    )
}