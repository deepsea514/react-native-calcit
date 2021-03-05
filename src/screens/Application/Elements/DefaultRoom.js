import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../common/consts/Colors';
import GestureHandler from '../Elements/GestureHandlers';

//redux
import { setShowOptions } from '../../../actions/OptionActions';
import { connect } from 'react-redux';
import { useMemoOne } from 'use-memo-one';
import { roomDimensions } from '../../../common/consts/DefaultLengths';
import { lengthConstant } from '../../../common/consts/LengthToAppConstant';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
Fontisto.loadFont();

function DefaultRoom(props) {
    let { setIsDragging, setIsDraggingIndex, setIsElementTrashable, id, setZoomDeleteIcon, roomType, showOptions, setShowOptions } = props;
    // console.log(showOptions, id)
    //drag variables
    let { lastOffset, resizeOffset } = useMemoOne(() => ({
        lastOffset: {
            x: 0,
            y: 0
        },
        resizeOffset: {
            x: 0,
            y: 0
        }
    }))
    const { translateX, translateY, rotate, resizeX, resizeY, } = useMemoOne(() => ({
        translateX: new Animated.Value(0),
        translateY: new Animated.Value(0),
        rotate: new Animated.Value(0),
        resizeX: new Animated.Value(100),
        resizeY: new Animated.Value(100),
    }), [])
    // const translateX = new Animated.Value(0);
    // const translateY = new Animated.Value(0);
    // let lastOffset = { x: 0, y: 0 };
    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: false }
    );
    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }
    }
    // const rotate = new Animated.Value(0);
    const rotateStr = rotate.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const rotateText = rotate.interpolate({
        inputRange: [0, 360],
        outputRange: ['360deg', '0deg']
    });

    // resize variables
    // const resizeX = new Animated.Value(0);
    // resizeX.setOffset(+(roomDimensions[roomType].width) / lengthConstant);
    // const resizeY = new Animated.Value(0);
    // resizeY.setOffset(+(roomDimensions[roomType].height) / lengthConstant);
    // let resizeOffset = { x: 0, y: 0 };

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

    function onHandlerStateChangeResize(event, position) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            resizeOffset.x += event.nativeEvent.translationX;
            resizeOffset.y += event.nativeEvent.translationY;
            resizeX.setOffset(resizeOffset.x);
            resizeX.setValue(0);
            resizeY.setOffset(resizeOffset.y);
            resizeY.setValue(0);
        }
    }
    const isStretchable = showOptions.selectedOption === 'stretch' && showOptions.id === id ? true : false;
    return (
        <GestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            resizeX={resizeX}
            resizeY={resizeY}
            translateX={translateX}
            translateY={translateY}
            rotate={rotate}
            onResizeGestureEvent={onResizeGestureEvent}
            onHandlerStateChangeResize={onHandlerStateChangeResize}
            isRotatable={showOptions.selectedOption === 'rotate' && showOptions.id === id ? true : false}

        >
            {/* <TouchableOpacity
                onLongPress={() => {
                    setShowOptions({
                        ...showOptions,
                        isVisible: true,
                        id: id
                    });
                }}
                activeOpacity={0.7}
            > */}
            {/* <Animated.View
                style={[styles.container,
                {
                    height: Animated.subtract(resizeY, 40),
                    width: Animated.subtract(resizeX, 40),
                    transform: [
                        {
                            rotate: rotateStr
                        }
                    ],
                    // backgroundColor: selected ? (Colors.primaryLight) : ('#fff')
                }
                ]}
            > */}
            <AnimatedTouchable
                activeOpacity={0.8}
                onLongPress={() => {
                    setShowOptions({
                        ...showOptions,
                        id,
                        isVisible: true,
                        selectedOption: ''
                    })
                }}
                style={[styles.container,
                {
                    height: Animated.subtract(resizeY, 40),
                    width: Animated.subtract(resizeX, 40),
                    transform: [
                        {
                            rotate: rotateStr
                        }
                    ],
                    // backgroundColor: selected ? (Colors.primaryLight) : ('#fff')
                }
                ]}
            >

                <Animated.Text
                    style={
                        [
                            {
                                transform: [
                                    {
                                        rotate: rotateText
                                    }
                                ]
                            }
                        ]
                    }
                >{roomType}</Animated.Text>
                {
                    isStretchable && (

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
            </AnimatedTouchable>


            {/* </Animated.View> */}
            {/* </TouchableOpacity> */}
        </GestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resize: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 4,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resizeTL: {
        left: -5,
        top: -5
    },
    resizeTR: {
        right: -5,
        top: -5,
    },
    resizeBL: {
        bottom: -5,
        left: -5
    },
    resizeBR: {
        bottom: -10,
        right: -10,
    },
})

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions
})
const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRoom);