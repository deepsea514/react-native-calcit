// import React, { useState, useEffect, Fragment } from 'react';

// //dimensions
// import { Dimensions, Platform, Vibration } from 'react-native';

// //dragg
// import Draggable from 'react-native-draggable';

// //gestures
// // import Gestures from 'react-native-easy-gestures';

// //redux imports
// import { connect } from 'react-redux';
// import { setPosition, setCurrentDimensions, setItemBelongsTo } from '../../../actions/OptionActions';

// //default room dimensions
// import { roomDimensions } from '../../../common/consts/DefaultLengths';
// import { lengthConstant } from '../../../common/consts/LengthToAppConstant';

// import ReactNativeHapticFeedback from "react-native-haptic-feedback";


// function ElementContainer({
//     children,
//     setIsDragging,
//     setIsDraggingIndex,
//     setIsElementTrashable,
//     id,
//     setZoomDeleteIcon,
//     isWall,
//     isRotate,
//     isDraggable,
//     isScalable,
//     setPosition,
//     positions,
//     dimensions,
//     itemBelongsTo,
//     originalDimensions,
//     setItemBelongsTo,
//     setOriginalDimensions
// }) {
//     // console.log(positions)
//     //current dimensions of the screen
//     const [currentDimensions, setCurrentDimensions] = useState({
//         WIDTH: Dimensions.get('window').width,  //widht -> current screen
//         HEIGHT: Dimensions.get('window').height //height -> current screen
//     });

//     //changing the dimensions on orientation change
//     function changeCurrentDimensions() {
//         setCurrentDimensions({
//             ...currentDimensions,
//             WIDTH: Dimensions.get('window').width,  //current width updated
//             HEIGHT: Dimensions.get('window').height //current height updated
//         });
//     }


//     //used to set boundaries when
//     //using react-native-draggable
//     function getMaxY() {

//         //maximum boundary of dragging in y axis
//         let maxY = currentDimensions.HEIGHT - 175;
//         //current height - height of 2 bottom bars
//         return maxY;
//     }

//     //adding event listner so that on orientation change can be listened
//     useEffect(() => {
//         //adding event listner
//         Dimensions.addEventListener('change', changeCurrentDimensions);
//         return () => {
//             //remove event listner 
//             //clean up
//             Dimensions.removeEventListener('change', changeCurrentDimensions);
//         };
//     }, []);

//     //check if the element is 
//     //dragged to trash icon or not
//     function isTrashable(gestureState, evt) {
//         // console.log(gestureState)
//         //condition when react-native-easy-gestures are used
//         let isArrivedAtTrashIcon = false;
//         // return isArrivedAtTrashIcon;
//         //condition if react-native-draggable is used
//         //gestureState.moveX > (currentDimensions.WIDTH - 60)=> defines the distace
//         // console.log(gestureState.moveX > (currentDimensions.WIDTH - 80)) 
//         if (gestureState.moveX > (currentDimensions.WIDTH - 80)) isArrivedAtTrashIcon = true;
//         //at which the element arrives to the trash button
//         // if ((evt?.nativeEvent?.pageX) > (currentDimensions.WIDTH - 60)) isArrivedAtTrashIcon = true;

//         return isArrivedAtTrashIcon;
//         // return false
//     }

//     function getSnapping(myPosition) {
//         let xToCheck = myPosition.x + originalDimensions[id]?.width;
//         let yToCheck = myPosition.y + originalDimensions[id]?.height;
//         Object.keys(positions).forEach((key, index) => {
//             if (key !== id) {//to check weather this view isn't snapping with its position
//                 let thisItemX = positions[key].x + +originalDimensions[key]?.width;
//                 let thisItemY = positions[key].y + +originalDimensions[key]?.height;
//                 if (checkInRange(xToCheck, thisItemX) || checkInRange(yToCheck, thisItemY) || checkInRange(myPosition.x, positions[key].x) || checkInRange(myPosition.y, positions[key].y)) {
//                     // Vibration.vibrate(5);
//                     const options = {
//                         enableVibrateFallback: true,
//                         ignoreAndroidSystemSettings: false
//                     };

//                     Platform.OS==='ios'?ReactNativeHapticFeedback.trigger("impactLight", options):Vibration.vibrate(5)
//                     // Vibration.vibrate(1000);
//                     return false;
//                 }
//             }
//         })
//     }
//     function checkInRange(toCheck, fixedNumber) {
//         const range = 0.5;
//         let snapped = false;
//         if (+toCheck < (+fixedNumber + range) && +toCheck > (+fixedNumber - range)) snapped = true;
//         return snapped
//     }
//     // console.log(positions)
//     //working events
//     //1. onStart => gesture component
//     //2. onChange => gesture component
//     //3. onEnd => gesture component
//     //currently not using draggable component

//     function checkDoorWindows(itemPosition) {
//         if (id.includes('doors') || id.includes('windows')) {

//             let itemBelongsToRoom = itemBelongsTo[id].room;
//             let roomPositions = positions[itemBelongsToRoom] ? positions[itemBelongsToRoom] : { x: -50, y: -50 };
//             let currentRoomDimensions = originalDimensions[itemBelongsToRoom] ? originalDimensions[itemBelongsToRoom] : {
//                 height: 4000,
//                 width: 4000
//             }

//             let wall1Position = {
//                 minX: roomPositions.x - 40,
//                 maxX: roomPositions.x,
//                 minY: roomPositions.y - 30,
//                 maxY: roomPositions.y + (+currentRoomDimensions.height) //room dimension
//             }
//             let wall2Position = {
//                 minX: roomPositions.x - 50,
//                 maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension
//                 minY: roomPositions.y - 40,
//                 maxY: roomPositions.y
//             }
//             let wall3Position = {
//                 minX: roomPositions.x + (+currentRoomDimensions.width) - 30, //room dimension
//                 maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension + 40
//                 minY: roomPositions.y - 50,
//                 maxY: roomPositions.y + (+currentRoomDimensions.height) //room dimension
//             }
//             let wall4Position = {
//                 minX: roomPositions.x - 50,
//                 maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension
//                 minY: roomPositions.y + (+currentRoomDimensions.height) - 60,
//                 maxY: roomPositions.y + (+currentRoomDimensions.height)
//             }
//             // console.log(itemPosition, roomPositions)
//             let wall = 0;
//             // let dx1 = Math.min(Math.abs(wall1Position.maxX - itemPosition.x), Math.abs(wall1Position.minX - itemPosition.x));
//             // let dy1 = Math.min(Math.abs(wall1Position.maxY - itemPosition.y), Math.abs(wall1Position.minY - itemPosition.y));

//             // let dx2 = Math.min(Math.abs(wall2Position.maxX - itemPosition.x), Math.abs(wall2Position.minX - itemPosition.x));
//             // let dy2 = Math.min(Math.abs(wall2Position.maxY - itemPosition.y), Math.abs(wall2Position.minY - itemPosition.y));
//             // console.log(dx1, dy1);
//             // console.log(dx2, dy2);
//             if (itemPosition.x < wall1Position.maxX && itemPosition.x > wall1Position.minX && itemPosition.y < wall1Position.maxY && itemPosition.y > wall1Position.minY) {
//                 wall = 1;
//             }
//             else if (itemPosition.x < wall2Position.maxX && itemPosition.x > wall2Position.minX && itemPosition.y < wall2Position.maxY && itemPosition.y > wall2Position.minY) {
//                 wall = 2;
//             }
//             else if (itemPosition.x < wall3Position.maxX && itemPosition.x > wall3Position.minX && itemPosition.y < wall3Position.maxY && itemPosition.y > wall3Position.minY) {
//                 wall = 3;
//             }
//             else if (itemPosition.x < wall4Position.maxX && itemPosition.x > wall4Position.minX && itemPosition.y < wall4Position.maxY && itemPosition.y > wall4Position.minY) {
//                 wall = 4;
//             }
//             setItemBelongsTo({
//                 ...itemBelongsTo,
//                 [id]: {
//                     ...itemBelongsTo[id],
//                     wall: wall
//                 }
//             })
//         }
//     }

//     const [initalPositions, setInitalPositions] = useState({
//         x: -50,
//         y: -50
//     })

//     useEffect(() => {
//         setInitalPositions({
//             ...initalPositions,
//             x: positions[id]?.x ? positions[id].x : -50,
//             y: positions[id]?.y ? positions[id].y : -50
//         })
//     }, []);

//     return (
//         //draggable -> react-native-draggable
//         //boundary view

//         <Draggable
//             // x={positions[id]?.x ? positions[id].x : -50}
//             // y={positions[id]?.y ? positions[id].y : -50}
//             x={initalPositions.x}
//             y={initalPositions.y}
//             // minY={160}
//             // maxX={160}
//             // maxY={getMaxY()}
//             onDragRelease={(evt, gestureState) => {
//                 let newPositions = positions;
//                 newPositions[id] = {
//                     x: gestureState.dx + (newPositions[id]?.x ? newPositions[id].x : -50),
//                     y: gestureState.dy + (newPositions[id]?.y ? newPositions[id].y : -50)
//                 }
//                 setPosition(newPositions);
//                 checkDoorWindows(newPositions[id]);
//                 setIsDragging(false);    //-> this flags shows the delete button
//                 if (isTrashable(gestureState)) {
//                     setIsElementTrashable(true);    //-> element is trashable
//                     setIsDraggingIndex(id); //=> this id is trashable
//                 }
//             }}
//             onPressIn={(event) => { }}
//             // onPressOut={(event) => { console.log("Pressing out"); setDisableDraggable(false) }}
//             onDrag={(event, gestureState) => {
//                 let newPositions = positions;
//                 let myPosition = {
//                     x: gestureState.dx + (newPositions[id]?.x ? newPositions[id].x : -50),
//                     y: gestureState.dy + (newPositions[id]?.y ? newPositions[id].y : -50)
//                 }
//                 getSnapping(myPosition);
//                 if (isTrashable(gestureState)) setZoomDeleteIcon(true);
//                 else setZoomDeleteIcon(false);
//                 setIsDragging(true);   //hide the trash icon
//             }}
//             // onRelease={(event, wasDragging) => {
//             //     console.log("Released")
//             //     setIsDragging(false);   //hide the trash icon
//             //     // setZoomDeleteIcon(false);
//             //     // setDisableDraggable(false);
//             // }}
//             disabled={!isDraggable}
//         >
//             <Fragment>
//                 {children}
//             </Fragment>
//         </Draggable>

//         // <Gestures
//         //     draggable={isDraggable !== undefined ? isDraggable : true}   //using react-native-draggable drag
//         //     scalable={isScalable !== undefined ? isScalable : isWall ? false : true}     //enable pinch zoom
//         //     rotatable={isRotate !== undefined ? isRotate : isWall ? false : true}    //enable rotate
//         //     onChange={(evt, styles) => {
//         //         if (isTrashable(styles, evt)) setZoomDeleteIcon(true);
//         //         else setZoomDeleteIcon(false);
//         //     }}
//         //     onStart={(evt, styles) => {
//         //         //making the trash icon visible
//         //         setIsDragging(true);

//         //         //setting that element which is being dragged or rotate
//         //         //or zoom is currently not trashable
//         //         setIsElementTrashable(false);

//         //         //currently the index of element which is trashable is null
//         //         setIsDraggingIndex(null);
//         //     }}

//         //     onEnd={(evt, gestureState) => {
//         //         setIsDragging(false);
//         //         if (isTrashable(gestureState, evt)) {
//         //             setIsElementTrashable(true);    //-> element is trashable
//         //             setIsDraggingIndex(id); //=> this id is trashable
//         //         };
//         //     }}
//         // >


//         //     {children}
//         // </Gestures>
//     )
// }

// const mapStateToProps = () => state => ({
//     positions: state.Options.positions,
//     itemBelongsTo: state.Options.itemBelongsTo,
//     dimensions: state.Options.dimensions,
//     originalDimensions: state.Options.currentDimensions
// });

// const mapDispatchToProps = () => dispatch => ({
//     setPosition: (position) => dispatch(setPosition(position)),
//     setItemBelongsTo: (payload) => dispatch(setItemBelongsTo(payload)),
//     setOriginalDimensions: (currentDimensions) => dispatch(setCurrentDimensions(currentDimensions))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);







// code for snapping



    // const onGestureEvent = (evt, gestureState) => {
    //     if (evt.nativeEvent.state === State.BEGAN) {
    //         // console.log("Started")
    //     }
    //     if (evt.nativeEvent.state === State.ACTIVE) {
    //         console.log(evt.nativeEvent)
    //         let xFinal = translateX._value + lastOffset.x;
    //         let yFinal = translateY._value + lastOffset.y;
    //         // console.log(xFinal > 140 && xFinal < 150 && yFinal > 140 && yFinal < 150)
    //         // let myPosition = {
    //         //     x: gestureState.dx + (newPositions[id]?.x ? newPositions[id].x : -50),
    //         //     y: gestureState.dy + (newPositions[id]?.y ? newPositions[id].y : -50)
    //         // }


    //         // console.log(giveRange(evt.nativeEvent.translationX))
    //         // translateY.setValue(giveRange(evt.nativeEvent.translationY));
    //         // translateX.setValue(giveRange(evt.nativeEvent.translationX));
    //         // let { isSnappable, value, type } = getSnapping({ x: xFinal, y: yFinal })
    //         // if (isSnappable) {
    //         //     console.log("Snapp here", value, type)
    //         //     if (type === 'x') {
    //         //         if (checkInRange((evt.nativeEvent.translationX + lastOffset.x), value)) {
    //         //             translateX.setValue(value - lastOffset.x);
    //         //         }
    //         //     }
    //         //     else if (type === 'y') {
    //         //         if (checkInRange((evt.nativeEvent.translationY + lastOffset.y), value)) {
    //         //             translateY.setValue(value - lastOffset.y);
    //         //         }
    //         //     }
    //         // }
    //     }
    // }

      // if (event.nativeEvent.oldState === State.ACTIVE) {
        //     // console.log("Released")
        //     lastOffset.x += event.nativeEvent.translationX;
        //     lastOffset.y += event.nativeEvent.translationY;

        //     // let { isSnappable, value, type } = getSnapping({ x: lastOffset.x, y: lastOffset.y })
        //     // console.log("was snapped ", isSnappable)
        //     // if (isSnappable) {
        //     //     if (type === 'x') {
        //     //         translateX.setOffset(value);
        //     //         translateX.setValue(0);
        //     //         translateY.setOffset(lastOffset.y);
        //     //         translateY.setValue(0);
        //     //     }
        //     //     else if (type === 'y') {
        //     //         translateX.setOffset(lastOffset.x);
        //     //         translateX.setValue(0);
        //     //         translateY.setOffset(value);
        //     //         translateY.setValue(0);
        //     //     }
        //     // }
        //     // else {
        //     translateX.setOffset(lastOffset.x);
        //     translateX.setValue(0);
        //     translateY.setOffset(lastOffset.y);
        //     translateY.setValue(0);
        //     // }
        //     onDragRelease({ dx: lastOffset.x, dy: lastOffset.y });
        // }


        // function getSnapping(myPosition) {
        //     let snapData = {
        //         isSnappable: false,
        //         value: null,
        //         type: ''
        //     }
        //     let xToCheck = myPosition.x + originalDimensions[id]?.width;
        //     let yToCheck = myPosition.y + originalDimensions[id]?.height;
        //     Object.keys(positions).forEach((key, index) => {
        //         if (key !== id) {//to check weather this view isn't snapping with its position
        //             let thisItemX = positions[key].x + +originalDimensions[key]?.width;
        //             let thisItemY = positions[key].y + +originalDimensions[key]?.height;
        //             if (checkInRange(xToCheck, thisItemX)) {
        //                 snapData.isSnappable = true;
        //                 snapData.value = thisItemX;
        //                 snapData.type = 'x';
        //             }
        //             if (checkInRange(yToCheck, thisItemY)) {
        //                 snapData.isSnappable = true;
        //                 snapData.value = thisItemY;
        //                 snapData.type = 'y';
        //             }
        //             if (checkInRange(myPosition.x, positions[key].x)) {
        //                 snapData.isSnappable = true;
        //                 snapData.value = positions[key].x;
        //                 snapData.type = 'x';
        //             }
        //             if (checkInRange(myPosition.y, positions[key].y)) {
        //                 snapData.isSnappable = true;
        //                 snapData.value = positions[key].y;
        //                 snapData.type = 'y';
        //             }
        //             if (snapData.isSnappable) {
        //                 Platform.OS === 'ios' ? ReactNativeHapticFeedback.trigger("impactLight", options) : Vibration.vibrate(5)
        //                 return false;
        //             }
        //         }
        //     })

        //     return snapData;
        // }
        // const options = {
        //     enableVibrateFallback: true,
        //     ignoreAndroidSystemSettings: false
        // };

          //function checks number in range 
    //1. number to check 
    //2. number to compare with
    //returns bool true if in range
    //else return false
    // function checkInRange(toCheck, fixedNumber) {
    //     const range = 5;    //fixed range in which number lies
    //     let snapped = false;
    //     if ((+toCheck < (+fixedNumber + range)) && (+toCheck > (+fixedNumber - range))) snapped = true;
    //     return snapped
    // }