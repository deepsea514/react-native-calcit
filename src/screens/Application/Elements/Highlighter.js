import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';

//draggable, rotatable, zoomable
import ElementContainer from './ElementContainer';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';

//consts
import Colors from '../../../common/consts/Colors';
import { useMemoOne } from 'use-memo-one';
import { defaultColor } from '../../../common/consts/HighlightColors';

//ico
import Fontisto from 'react-native-vector-icons/Fontisto';

//redux imports
import { connect } from 'react-redux';
import { setCurrentDimensions } from '../../../actions/OptionActions'

import _, { set } from 'lodash'

Fontisto.loadFont();


function Highlighter(props) {

    let {
        setIsDragging,
        setIsDraggingIndex,
        setIsElementTrashable,
        id,
        setZoomDeleteIcon,
        setOriginalDimensions,
        originalDimensions,
        color,
        isGeneratingPDF
    } = props;

    const dimensionHandler = useCallback(_.debounce(changeDisplayHeight, 200), []);

    function changeDisplayHeight(layout, originalDimensions) {
        setOriginalDimensions({
            ...originalDimensions,
            [id]: {
                height: (layout.height).toFixed(),
                width: (layout.width).toFixed()
            }
        });
    }


    let { resizeOffset } = useMemoOne(() => ({
        resizeOffset: {
            x: 0,
            y: 0
        }
    }))

    const { resizeX, resizeY } = useMemoOne(() => ({
        resizeX: new Animated.Value(0),
        resizeY: new Animated.Value(0),
    }), []);

    const animatedHeight = resizeY.interpolate({
        inputRange: [0, 150],
        outputRange: [100, 300]
    })
    const animatedWidth = resizeX.interpolate({
        inputRange: [0, 150],
        outputRange: [100, 300]
    })

    const animatedHeightIOS = resizeX.interpolate({
        inputRange: [0, 300],
        outputRange: [100, 450],
        extrapolateRight: 'clamp'
    })
    const animatedWidthIOS = resizeY.interpolate({
        inputRange: [0, 300],
        outputRange: [100, -120],
        extrapolateRight: 'clamp'
    })


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


    return (
        <View
            style={{
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <ElementContainer
                id={id}
                setIsDragging={setIsDragging}
                setIsDraggingIndex={setIsDraggingIndex}
                setIsElementTrashable={setIsElementTrashable}
                setZoomDeleteIcon={setZoomDeleteIcon}
                isDraggable={true}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ position: 'relative', }}
                >
                    <Animated.View
                        onLayout={(e) => {
                            let { layout } = e.nativeEvent;
                            dimensionHandler(layout, originalDimensions);
                        }}
                        style={
                            [styles.roomContainer, {
                                height: Platform.OS === 'ios' ? (animatedHeightIOS) : (animatedHeight),
                                width: Platform.OS === 'ios' ? (animatedWidthIOS) : (animatedWidth),
                                backgroundColor: color ? color : defaultColor.color,
                            }]
                        }
                    >
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
                                ],
                                opacity: isGeneratingPDF ? 0 : 1,
                                //handle the visibility of the highlighter
                                //depending on the variable isGeneratingPDF
                            }
                            ]} >
                                <Fontisto
                                    name="arrow-resize"
                                />
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </TouchableOpacity>

            </ElementContainer>
        </View>

    )
}

const mapStateToProps = () => state => ({
    // showOptions: state.Options.showOptions,
    originalDimensions: state.Options.currentDimensions,

    //generating pdf flag
    isGeneratingPDF: state.Project.isGeneratingPDF
});

const mapDispatchToProps = () => dispatch => ({
    setOriginalDimensions: (dimensions) => dispatch(setCurrentDimensions(dimensions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Highlighter)

const styles = StyleSheet.create({
    roomContainer: {
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
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
