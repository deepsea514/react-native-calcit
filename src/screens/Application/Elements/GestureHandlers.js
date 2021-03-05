
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
    PanGestureHandler,
} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Colors from '../../../common/consts/Colors';

Fontisto.loadFont();

export default function DefaultRoom({
    children,
    onGestureEvent,
    onHandlerStateChange,
    resizeX,
    resizeY,
    translateX,
    translateY,
    rotate,
    onResizeGestureEvent,
    onHandlerStateChangeResize,
    isRotatable
}) {

    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            enabled={isRotatable?false:true}
            maxPointers={2}
            minPointers={1}
        >
            <Animated.View style={[{
                height: resizeY,
                width: resizeX,
                transform: [
                    { translateX: translateX },
                    { translateY: translateY },
                ],
            }]}>

                {children}
                {
                    isRotatable && (
                        <Slider
                            minimumValue={0}
                            maximumValue={360}
                            style={{ height: 40, width: 200, alignSelf: 'center' }}
                            minimumTrackTintColor={Colors.primary}
                            thumbTintColor={Colors.primary}
                            maximumTrackTintColor="#000000"
                            onSlidingComplete={() => { }}
                            // value={eraserStrokeSize}
                            onValueChange={(value) => {
                                Animated.spring(rotate, {
                                    toValue: value,
                                    useNativeDriver: false,
                                    friction: 100
                                }).start()
                            }}   //setting the value to state
                        />

                    )
                }
            </Animated.View>
        </PanGestureHandler>
    )
}