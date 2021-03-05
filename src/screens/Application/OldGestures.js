// zoom
// import ReAnimated, {
//     Value,
//     block,
//     cond,
//     eq,
//     set,
//     useCode,
//     add,
//     call,
//     max,
//     multiply
// } from "react-native-reanimated";
// import {
//     PanGestureHandler,
//     PinchGestureHandler,
//     ScrollView,
//     State,
// } from "react-native-gesture-handler";

// import {
//     onGestureEvent,
//     pinchActive,
//     pinchBegan,
//     timing,
//     transformOrigin,
//     translate,
//     vec,
//     useValue,
//     withScaleOffset,
//     withOffset,
//     useVector,
//     useValues,
//     pinchEnd
// } from 'react-native-redash/lib/module/v1'



// const { pinch } = useMemoOne(() => ({
//     pinch: vec.create(useValue(0), useValue(0))
// }))

// const { baseScale, pinchScale } = useMemoOne(() => ({
//     baseScale: new Animated.Value(1),
//     pinchScale: new Animated.Value(1),
// }));
// let { lastScale } = useMemoOne(() => ({
//     lastScale: 1
// }))

// const baseScale = new Animated.Value(1);
// const pinchScale = new Animated.Value(1);
// const scale = Animated.multiply(baseScale, pinchScale);
// // let lastScale = 1;
// const onPinchGestureEvent = Animated.event(
//     [{ nativeEvent: { scale: pinchScale } }],
//     { useNativeDriver: true }
// );

// function onPinchHandlerStateChange(event) {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//         lastScale *= event.nativeEvent.scale;
//         baseScale.setValue(lastScale);
//         pinchScale.setValue(1);
//     }
// };


// const [scale, numberOfPointers, state, scaleOffset, gestureScale] = useValues(1, 0, State.UNDETERMINED, 1, 1)
// const origin = useVector(0, 0);
// const pinch = useVector(0, 0);
// const focal = useVector(0, 0);

// const pinchGestureHandler = onGestureEvent({
//     numberOfPointers,
//     state,
//     scale: gestureScale,
//     focalX: focal.x,
//     focalY: focal.y
// });

// const adjustedFocal = vec.add(
//     {
//         x: -currentDimensions.WIDTH / 2,
//         y: -currentDimensions.HEIGHT / 2,
//     },
//     focal
// );
// useCode(
//     () =>
//         block([
//             cond(
//                 pinchBegan(state),
//                 vec.set(origin, adjustedFocal)
//             ),
//             cond(
//                 pinchActive(state, numberOfPointers),
//                 vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))
//             ),
//             cond(eq(state, State.END), [
//                 set(scaleOffset, scale),
//                 set(gestureScale, 1),
//             ]),
//             set(scale, multiply(scaleOffset, gestureScale)),
//         ]),
//     [adjustedFocal, origin, pinch, state, numberOfPointers]
// );

{/* art board */ }
{/* <PanGestureHandler> */ }
{/* <PinchGestureHandler

                // ref={pinchRef}
                // simultaneousHandlers={[]}

                {...pinchGestureHandler}
                // onGestureEvent={onPinchGestureEvent}
                // onHandlerStateChange={onPinchHandlerStateChange}

            > */}

// transform: [
//     ...translate(pinch),
//     ...transformOrigin(origin, { scale }),
//     // { perspective: 200 },
//     // { scale: scale }
// ],
// backgroundColor: '#a0a'

{/* </PinchGestureHandler> */ }
{/* </PanGestureHandler> */ }

{/* <TouchableOpacity
style={[styles.optionButton, {
    backgroundColor: artboardDraggable ? '#999' : (
        props.showOptions.selectedOption === 'rotate' ? (Colors.primary) : (Colors.textDark)
    )
}]}
onPress={() => {
    props.setShowOptions({
        ...props.showOptions,
        selectedOption: 'rotate'
    })
}}
disabled={artboardDraggable}

>
<Text
    style={[styles.optionButtonText,]}
>
    Rotate
</Text>
</TouchableOpacity> */}