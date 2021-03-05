import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Vibration, ImageBackground, Platform } from 'react-native';
import Slider from '@react-native-community/slider';

//draggable, rotatable, zoomable
import ElementContainer from './ElementContainer';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import EditRoomLabelModal from './EditRoomLabelModal';

//default lengths
import { roomDimensions } from '../../../common/consts/DefaultLengths';
import { lengthConstant } from '../../../common/consts/LengthToAppConstant';

//consts
import Colors from '../../../common/consts/Colors';

//ico
import Fontisto from 'react-native-vector-icons/Fontisto';

//redux imports
import { connect } from 'react-redux';
import { setCeilingHeights, setCurrentDimensions, setLabels, setShowOptions, setTileTool } from '../../../actions/OptionActions'
import { useMemoOne } from 'use-memo-one';

//notes modal
import NotesRoomModal from './NotesRoomModal';

import Textures from '../../../common/consts/Textures';
import CeilingHeightModal from '../../../common/components/App/Project/CeilingHeight';
import _, { set } from 'lodash'
import RotateText from '../../../common/components/App/Project/AnimatedRerenders/RotateText';
import DimensionsText from '../../../common/components/App/Project/AnimatedRerenders/DimensionsText';

Fontisto.loadFont();


function DefaultRoom({

    setIsDragging,
    setIsDraggingIndex,
    setIsElementTrashable,
    id,
    location,
    setZoomDeleteIcon,
    roomType,
    showOptions,
    setParentOptions,
    ceilingHeight,
    setCeilingHeightsGloabl,
    textures,
    ceilingType,
    setOriginalDimensions,
    originalDimensions,
    globalLabels,
    setLabelsGlobal,
    globalNotes
}) {

    const dimensionsRef = useRef();
    const dimensionHandler = useCallback(_.debounce(changeDisplayHeight, 200), []);

    const [customRoomType, setRoomType] = useState(roomType);
    const [notes, setNotes] = useState('');
    const [editLabelModal, setEditLabelModal] = useState(false);
    const [notesModal, setNotesModal] = useState(false);
    const [ceilingHeightModal, setCeilingHeightModal] = useState(false);
    const [currentWall, setCurrentWall] = useState('');
    const [isTileTool, isSetTileTool] = useState(false);
    const [currentDimensions, setCurrentDimensions] = useState({
        height: +(roomDimensions[roomType].height),
        width: +(roomDimensions[roomType].width)
    });

    const [dimensionsToDisplay, setDimensionsToDisplay] = useState({
        height: +(roomDimensions[roomType].height),
        width: +(roomDimensions[roomType].width)
    });

    useEffect(() => {
        if (showOptions.selectedOption === 'editLabel' && showOptions.id === id) {
            setEditLabelModal(true);
        }
    }, [showOptions.selectedOption]);

    useEffect(() => {
        if (globalLabels[id]) {
            //set here the current label
        }
    }, [globalLabels])

    function changeDisplayHeight(layout, originalDimensions) {
        setOriginalDimensions({
            ...originalDimensions,
            [id]: {
                height: (layout.height),
                width: (layout.width)
            }
        });
    }
    // useEffect(() => {
    //     console.log(originalDimensions)
    //     if (originalDimensions[id]) {
    //         // setCurrentDimensions({
    //         //     height: +originalDimensions[id].height * lengthConstant,
    //         //     width: +originalDimensions[id].width * lengthConstant
    //         // })
    //     }
    // }, [originalDimensions])
    useEffect(() => {
        setLabelsGlobal({
            ...globalLabels,
            [id]: roomType
        });
    }, []);

    useEffect(() => {
        if (showOptions.selectedOption === 'notes' && showOptions.id === id) {
            setNotesModal(true);
        }
    }, [showOptions.selectedOption])

    let { resizeOffset } = useMemoOne(() => ({
        resizeOffset: {
            x: 0,
            y: 0
        }
    }))

    const { rotate, resizeX, resizeY } = useMemoOne(() => ({
        rotate: new Animated.Value(0),
        resizeX: new Animated.Value(0),
        resizeY: new Animated.Value(0),
    }), []);

    const animatedHeight = resizeY.interpolate({
        inputRange: [0, 150],
        outputRange: [currentDimensions.height / lengthConstant, 300]
    })
    const animatedWidth = resizeX.interpolate({
        inputRange: [0, 150],
        outputRange: [currentDimensions.width / lengthConstant, 300]
    })

    const animatedHeightIOS = resizeX.interpolate({
        inputRange: [0, 300],
        outputRange: [currentDimensions.height / lengthConstant, 450],
        extrapolateRight: 'clamp'
    })
    const animatedWidthIOS = resizeY.interpolate({
        inputRange: [0, 300],
        outputRange: [currentDimensions.width / lengthConstant, -120],
        extrapolateRight: 'clamp'
    })
    const rotateStr = rotate.interpolate({

        //b king the degrees at 90*n degrees
        inputRange: [0, 85, 90, 95, 175, 180, 185, 265, 270, 275, 360],
        outputRange: ['0deg', '90deg', '90deg', '90deg', '180deg', '180deg', '180deg', '270deg', '270deg', '270deg', '360deg'],
    });

    function onHandlerStateChangeResize(event, position) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            resizeOffset = {
                x: resizeOffset.x + event.nativeEvent.translationX,
                y: resizeOffset.y + event.nativeEvent.translationY
            }
            resizeX.extractOffset();
            resizeY.extractOffset();
        }
    } 
    const onResizeGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: resizeX,
                    translationY: resizeY,
                },
            },
        ],
        { useNativeDriver: false }
    );


    // //resize rc variables
    // const { resizercX } = useMemoOne(() => ({
    //     resizercX: new Animated.Value(0),
    // }), []);
    // let { resizercOffset } = useMemoOne(() => ({
    //     resizercOffset: {
    //         x: 0,
    //     }
    // }))

    // const onResizeGestureRC = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 translationX: resizercX,
    //             },
    //         },
    //     ],
    //     { useNativeDriver: false }
    // )
    // function onResizeHandlerRC(event, position) {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         resizercOffset.x += event.nativeEvent.translationX;
    //         resizercX.setOffset(resizercOffset.x);
    //         resizercX.setValue(0);
    //     }
    // }
    // const rcWidth = resizercX.interpolate({
    //     inputRange: [0, 300],
    //     outputRange: [100, 300],
    // })



    // //resize lc variables
    // const { resizelcX } = useMemoOne(() => ({
    //     resizelcX: new Animated.Value(0),
    // }), []);
    // let { resizelcOffset } = useMemoOne(() => ({
    //     resizelcOffset: {
    //         x: 0,
    //     }
    // }))

    // const onResizeGestureLC = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 translationX: resizelcX,
    //             },
    //         },
    //     ],
    //     { useNativeDriver: false }
    // )
    // function onResizeHandlerLC(event) {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         resizelcOffset.x += event.nativeEvent.translationX;
    //         resizelcX.setOffset(resizelcOffset.x);
    //         resizelcX.setValue(0);
    //     }
    // }
    // const lcWidth = resizelcX.interpolate({
    //     inputRange: [0, 300],
    //     outputRange: [0, -300],
    //     // extrapolateLeft: 'identity',
    //     // extrapolateRight: 'clamp'
    // })

    // //resize tc variables
    // const { resizetcY } = useMemoOne(() => ({
    //     resizetcY: new Animated.Value(0),
    // }), []);
    // let { resizetcOffset } = useMemoOne(() => ({
    //     resizetcOffset: {
    //         x: 0,
    //     }
    // }))

    // const onResizeGestureTC = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 translationY: resizetcY,
    //             },
    //         },
    //     ],
    //     { useNativeDriver: false }
    // )
    // function onResizeHandlerTC(event) {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         resizetcOffset.x += event.nativeEvent.translationY;
    //         resizetcY.setOffset(resizetcOffset.x);
    //         resizetcY.setValue(0);
    //     }
    // }
    // const tcHeight = resizetcY.interpolate({
    //     inputRange: [0, 300],
    //     outputRange: [100, -300],
    //     // extrapolateLeft: 'identity',
    //     // extrapolateRight: 'clamp'
    // })



    // //resize bc variables
    // const { resizebcY } = useMemoOne(() => ({
    //     resizebcY: new Animated.Value(0),
    // }), []);
    // let { resizebcOffset } = useMemoOne(() => ({
    //     resizebcOffset: {
    //         x: 0,
    //     }
    // }))

    // const onResizeGestureBC = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 translationY: resizebcY,
    //             },
    //         },
    //     ],
    //     { useNativeDriver: false }
    // )
    // function onResizeHandlerBC(event) {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         resizebcOffset.x += event.nativeEvent.translationY;
    //         resizebcY.setOffset(resizebcOffset.x);
    //         resizebcY.setValue(0);
    //     }
    // }
    // const bcHeight = resizebcY.interpolate({
    //     inputRange: [0, 300],
    //     outputRange: [0, 300],
    // })

    return (
        <View 
            style={{ alignItems: 'center', position: 'relative' }}
            pointerEvents={'box-none'}
        >
            <ElementContainer
                id={id}
                location={location}
                setIsDragging={setIsDragging}
                setIsDraggingIndex={setIsDraggingIndex}
                setIsElementTrashable={setIsElementTrashable}
                setZoomDeleteIcon={setZoomDeleteIcon}
                isDraggable={showOptions.selectedOption === 'stretch' && showOptions.id === id ? false : true}
                isRotate={showOptions.selectedOption === 'rotateSlider' && showOptions.id === id ? true : false}
                isScalable={false}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={(e) => {
                        // setShowRoomOptions(previousState => !previousState);
                        setParentOptions({
                            ...showOptions,
                            isVisible: true,
                            id,
                            selectedOption: ''
                        });
                    }}
                    style={{ position: 'relative', }}
                >
                    {/* <Animated.View style={{
                        position: 'relative',
                        transform: [
                            {
                                translateX: Animated.subtract(lcWidth, Animated.multiply(lcWidth, 2)),
                            },
                            {
                                translateY: Animated.subtract(tcHeight, Animated.multiply(tcHeight, 2))
                            }
                        ]
                    }}> */}
                    {/* <Animated.View
                            style={{
                                backgroundColor: 'transparent',
                                height: 100,
                                width: 100,
                            }}
                        >
                            <Animated.View style={[{
                                height: Animated.add(tcHeight, bcHeight),
                                width: 2,
                                backgroundColor: 'blue',
                                transform: [
                                    // {
                                    //     translateX: Animated.add(rcWidth, lcWidth),
                                    // },
                                    // {
                                    //     translateY: Animated.subtract()
                                    // }
                                ]
                            }]}>

                            </Animated.View>
                            <Animated.View style={[{
                                height: Animated.add(tcHeight, bcHeight),
                                width: 2,
                                backgroundColor: 'black',
                                transform: [
                                    {
                                        translateX: Animated.add(rcWidth, lcWidth),
                                    },
                                    {
                                        translateY: Animated.subtract(0, tcHeight)
                                    }
                                ]
                            }]}>
                            </Animated.View>
                            <Animated.View style={[{
                                height: 2,
                                width: Animated.add(rcWidth, lcWidth),
                                backgroundColor: 'red',
                                transform: [
                                    {
                                        translateX: 0,
                                    },
                                    {
                                        translateY: Animated.multiply(Animated.subtract(tcHeight, Animated.multiply(tcHeight, 2)), 2)
                                    }
                                ]
                            }]}></Animated.View>
                            <Animated.View style={[{
                                height: 2,
                                width: Animated.add(rcWidth, lcWidth),
                                backgroundColor: 'green',
                                transform: [
                                    {
                                        translateX: 0,
                                    },
                                    {
                                        translateY: Animated.subtract(tcHeight, Animated.multiply(tcHeight, 2))
                                    }
                                ]
                            }]}></Animated.View>
                        </Animated.View> */}
                    <Animated.View
                        onLayout={(e) => {
                            let { layout } = e.nativeEvent;
                            dimensionHandler(layout, originalDimensions);
                            dimensionsRef.current.generateDimensions(layout);
                        }}
                        style={
                            [styles.roomContainer,
                            {
                                // height: (+(roomDimensions[roomType].height) / lengthConstant),
                                // width: (+(roomDimensions[roomType].width) / lengthConstant),
                                height: Platform.OS === 'ios' ? (animatedHeightIOS) : (animatedHeight),
                                width: Platform.OS === 'ios' ? (animatedWidthIOS) : (animatedWidth),
                                backgroundColor: showOptions.id === id ? Colors.primaryLight : '#fff',
                                transform: [
                                    {
                                        rotate: rotateStr
                                    }
                                ]
                            }
                            ]
                        }
                    >
                        {
                            getCathedralShow() && (
                                <View
                                    style={styles.cathedralView}
                                />
                            )
                        }
                        <ImageBackground
                            style={styles.textureImage}
                            source={getTextureImage()}
                            resizeMode="repeat"
                        >
                            {
                                getLabelCondition() ? (null) : (
                                    <View style={[styles.roomLabelContainer, {
                                        backgroundColor: (getTextureImage() && id === showOptions.id) ? (Colors.primaryLight) : ('#ffffff88')
                                    }]}>
                                        <Text style={styles.roomName} numberOfLines={1}>{customRoomType}</Text>
                                        {/* <Text
                                            style={styles.roomDescription}
                                            numberOfLines={1}
                                        >
                                            {dimensionsToDisplay.width} x {dimensionsToDisplay.height}
                                        </Text> */}
                                        <DimensionsText
                                            ref={dimensionsRef}
                                            styles={styles}
                                            defaultDimensions={dimensionsToDisplay}
                                            lengthConstant={lengthConstant}
                                        />
                                        <Text
                                            style={styles.roomDescription}
                                            numberOfLines={1}
                                        >
                                            C.H: {ceilingHeight[id] ? ceilingHeight[id] : '0'}mm
                                    </Text>
                                    </View>
                                )
                            }
                        </ImageBackground>
                        {
                            showOptions.selectedOption === 'stretch' && showOptions.id === id && (
                                <PanGestureHandler
                                    maxPointers={1}
                                    minPointers={1}
                                    enabled={true}
                                    onGestureEvent={onResizeGestureEvent}
                                    onHandlerStateChange={(evt) => { onHandlerStateChangeResize(evt, 'br') }}
                                >
                                    <Animated.View style={[styles.resize, styles.resizeBR
                                        , {
                                        transform: [
                                            {
                                                rotate: '90deg'
                                            }
                                        ]
                                    }
                                    ]} >
                                        <Fontisto
                                            name="arrow-resize"
                                        />
                                    </Animated.View>
                                </PanGestureHandler>
                            )
                        }
                        {
                            getCathedralShow() && renderWalls()
                        }
                        {
                            getTileTool('wallTile') && renderWallTile()
                        }
                        {
                            getTileTool('splashBackTile') && renderSplashBackTile()
                        }
                    </Animated.View>
                </TouchableOpacity>
                {
                    showOptions.selectedOption === 'rotateSlider' && showOptions.id === id && (
                        <View style={styles.sliderContainer}>
                            {/* <View style={styles.degreeTextContainer}>
                                <Text style={styles.degreeText}>{rotateDipslay}</Text>
                                <Text style={styles.degree}>°</Text>
                            </View> */}
                            <RotateText
                                styles={styles}
                                rotateStr={rotateStr}
                            />
                            <Slider
                                step={5}
                                minimumValue={0}
                                maximumValue={360}
                                style={{ height: 40, width: 120, alignSelf: 'center' }}
                                minimumTrackTintColor={Colors.primary}
                                thumbTintColor={Colors.primary}
                                maximumTrackTintColor="#000000"
                                onValueChange={(value) => {
                                    //vibration on these degrees
                                    if (value === 0 || value === 360 || value === 90 || value === 180 || value === 270)
                                        Vibration.vibrate(30);  //30=> time in ms
                                    Animated.spring(rotate, {
                                        toValue: value,
                                        useNativeDriver: false,
                                        friction: 100
                                    }).start()
                                }}   //setting the value to state
                            />
                        </View>
                    )
                }
                {
                    showOptions.selectedOption === 'cHeight' && showOptions.id === id && (
                        <View>
                            <Slider
                                minimumValue={0}
                                maximumValue={10000}
                                style={{ height: 40, width: 150, alignSelf: 'center' }}
                                minimumTrackTintColor={Colors.primary}
                                thumbTintColor={Colors.primary}
                                maximumTrackTintColor="#000000"
                                onValueChange={(value) => {
                                    saveCurrentCH(value)
                                }}
                                step={getStepSlider('cHeight')}
                            />
                        </View>
                    )
                }

            </ElementContainer>
            <CeilingHeightModal
                modalVisible={ceilingHeightModal}
                currentWall={currentWall}
                id={id}
                setModalVisible={setCeilingHeightModal}
                isTileTool={isTileTool}
                isSetTileTool={isSetTileTool}
            />

            <EditRoomLabelModal
                modalVisible={editLabelModal}
                setModalVisible={setEditLabelModal}
                customRoomType={customRoomType}
                setRoomType={setRoomType}
                showOptions={showOptions}
                setParentOptions={setParentOptions}
                id={id}
            />
            <NotesRoomModal
                modalVisible={notesModal}
                setModalVisible={setNotesModal}
                notes={notes}
                setNotes={setNotes}
                showOptions={showOptions}
                setParentOptions={setParentOptions}
                id={id}
            />
        </View>

    )
    function getStepSlider(type) {
        if (type === 'cHeight') return 10;
    }
    function getTextureImage() {
        let imageId = textures[id];
        if (imageId && imageId === 'remove') {
            return null
        }
        else {
            if (imageId) {
                let textureDetails = Textures.find(e => e.id === imageId)
                return textureDetails.image;
            }
            else return null;
        }
    }
    function saveCurrentCH(value) {
        // console.log(newCeilingHeights)
        setCeilingHeightsGloabl({
            ...ceilingHeight,
            [id]: value.toFixed()
        })
    }

    function getLabelCondition() {
        let index = showOptions.labels.findIndex(e => e.id === id);
        let labelStatus = false;
        if (index !== -1) {
            let { currentLabel } = showOptions.labels[index];
            if (currentLabel === 'Show') labelStatus = true
        }
        return labelStatus;
    }
    function getCathedralShow() {
        if (ceilingType[id] === 'cathedral') return true;
    }
    function getTileTool(name) {
        if (showOptions.id === id && showOptions.selectedOption === name) return true;
    }
    function renderSplashBackTile() {
        return (
            <TouchableOpacity
                style={[styles.wallHR, { top: 0, backgroundColor: Colors.danger }]}
                onPress={() => {
                    isSetTileTool('splashBackTile');
                    setCeilingHeightModal(true);
                }}
            />
        )
    }
    function renderWallTile() {
        return (
            <Fragment>
                <TouchableOpacity
                    style={[styles.wallVR, { left: 0, backgroundColor: Colors.ornage }]}
                    onPress={() => {
                        isSetTileTool('wallTile');
                        setCurrentWall('1')
                        setCeilingHeightModal(true);
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallVR, { right: 0, backgroundColor: Colors.ornage }]}
                    onPress={() => {
                        isSetTileTool('wallTile');
                        setCurrentWall('3')
                        setCeilingHeightModal(true);
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallHR, { top: 0, backgroundColor: Colors.ornage }]}
                    onPress={() => {
                        isSetTileTool('wallTile');
                        setCeilingHeightModal(true);
                        setCurrentWall('2')
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallHR, { bottom: 0, backgroundColor: Colors.ornage }]}
                    onPress={() => {
                        isSetTileTool('wallTile');
                        setCurrentWall('4')
                        setCeilingHeightModal(true);
                    }}
                />
            </Fragment>
        )
    }
    function renderWalls() {
        return (
            <Fragment>
                <TouchableOpacity
                    style={[styles.wallVR, { left: 0 }]}
                    onPress={() => {
                        setCeilingHeightModal(true);
                        setCurrentWall('1');
                        isSetTileTool(false);
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallVR, { right: 0 }]}
                    onPress={() => {
                        setCeilingHeightModal(true);
                        setCurrentWall('3');
                        isSetTileTool(false);
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallHR, { top: 0 }]}
                    onPress={() => {
                        setCeilingHeightModal(true);
                        setCurrentWall('2');
                        isSetTileTool(false);
                    }}
                />
                <TouchableOpacity
                    style={[styles.wallHR, { bottom: 0 }]}
                    onPress={() => {
                        setCeilingHeightModal(true);
                        setCurrentWall('4');
                        isSetTileTool(false);
                    }}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions,
    ceilingHeight: state.Options.ceilingHeight,
    textures: state.Options.textures,
    ceilingType: state.Options.ceilingType,
    originalDimensions: state.Options.currentDimensions,
    globalLabels: state.Options.labels,
    globalNotes: state.Options.notes
});

const mapDispatchToProps = () => dispatch => ({
    setParentOptions: (options) => dispatch(setShowOptions(options)),
    setCeilingHeightsGloabl: (heights) => dispatch(setCeilingHeights(heights)),
    setOriginalDimensions: (dimensions) => dispatch(setCurrentDimensions(dimensions)),
    setLabelsGlobal: (notes) => dispatch(setLabels(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRoom)

const styles = StyleSheet.create({
    roomContainer: {
        width: 100,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roomName: {
        textTransform: 'capitalize'
    },
    roomLabelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#ffffff88',
        borderRadius: 4
    },
    roomDescription: {
        fontSize: 9
    },
    resize: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 4,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    resizeTL: {
        left: -15,
        top: -15,
    },
    resizeTR: {
        right: -15,
        top: -15
    },
    resizeBL: {
        bottom: -15,
        left: -15
    },
    resizeBR: {
        ...Platform.select({
            ios: {
                bottom: -15,
                right: -15,
            },
            android: {
                bottom: 0,
                right: 0
            }
        })
    },
    resizeRC: {
        top: '40%',
        right: -15
    },
    resizeLC: {
        top: '40%',
        left: -15
    },
    resizeTC: {
        left: '40%',
        top: -15
    },
    resizeBC: {
        left: '40%',
        bottom: -15
    },
    optionsContainer: {
        padding: 5,
        // flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 360,
        justifyContent: 'center',
        position: 'absolute',
        maxHeight: 300
    },
    optionButton: {
        backgroundColor: Colors.textDark,
        // padding: 30,
        marginTop: 10,
        marginLeft: 10,
        // paddingHorizontal: 20,
        borderRadius: 4,
        width: 60,
        height: 60,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    optionActive: {
        backgroundColor: Colors.primary
    },
    textureImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOpacity: {
        padding: 2,
        backgroundColor: '#ffffff55',
        borderRadius: 4
    },
    cathedralView: {
        height: '100%',
        width: 1,
        position: 'absolute',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Colors.textDark,
        borderRadius: 1
    },
    wallVR: {
        height: '100%',
        width: 5,
        position: 'absolute',
        backgroundColor: Colors.primary,
    },
    wallHR: {
        height: 5,
        width: '100%',
        position: 'absolute',
        backgroundColor: Colors.primary,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    degreeTextContainer: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        marginRight: 5
    },
    degreeText: {
        fontSize: 10,
        fontWeight: 'bold'
    },
})
