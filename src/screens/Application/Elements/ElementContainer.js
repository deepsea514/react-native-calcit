import React, { useState, useEffect, Fragment } from 'react';

//react native
import { Dimensions, Animated, View } from 'react-native';

//dragg
import { ipRange, opRange } from '../../../common/consts/Range';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import { useMemoOne } from 'use-memo-one';

//redux imports
import { connect } from 'react-redux';
import { setPosition, setCurrentDimensions, setItemBelongsTo, setSnapGridX, setSnapGridY, resetSnapGridXY } from '../../../actions/OptionActions';

//default room dimensions
import { roomDimensions } from '../../../common/consts/DefaultLengths';

function ElementContainer({
    children,
    setIsDragging,
    setIsDraggingIndex,
    setIsElementTrashable,
    id,
    location,
    setZoomDeleteIcon,
    isWall,
    isRotate,
    isDraggable,
    isScalable,
    setPosition,
    positions,
    dimensions,
    itemBelongsTo,
    originalDimensions,
    setItemBelongsTo,
    setOriginalDimensions,
    artboardDraggable,
    setSnapGridX,
    setSnapGridY,
    resetSnapGridXY,
}) {
    // document.createEvent('TouchEvent');
    // e.touches = [{pageX: location.x, pageY: location.y}];

    //current dimensions of the screen
    console.log("Children", children)
    const [currentDimensions, setCurrentDimensions] = useState({
        WIDTH: Dimensions.get('window').width,  //widht -> current screen
        HEIGHT: Dimensions.get('window').height //height -> current screen
    });

    const [ranges, setRanges] = useState(false);

    const [newRanges, setNewRanges] = useState({
        ip: [],
        op: []
    })

    //changing the dimensions on orientation change
    function changeCurrentDimensions() {
        setCurrentDimensions({
            ...currentDimensions,
            WIDTH: Dimensions.get('window').width,  //current width updated
            HEIGHT: Dimensions.get('window').height //current height updated
        });
    }

    useEffect(() => {
        Dimensions.addEventListener('change', changeCurrentDimensions);
        return () => {
            Dimensions.removeEventListener('change', changeCurrentDimensions);
        };
    }, []);

    function isTrashable(nativeEvent) {
        let isArrivedAtTrashIcon = false;
        if (nativeEvent.absoluteX > (currentDimensions.WIDTH - 80)) isArrivedAtTrashIcon = true;
        return isArrivedAtTrashIcon;
    }
    function checkDoorWindows(itemPosition) {
        if (id.includes('doors') || id.includes('windows')) {

            let itemBelongsToRoom = itemBelongsTo[id].room;
            let roomId = itemBelongsToRoom?.replace('defaultRoom', '');
            roomId = roomId?.match(/[a-zA-Z]+/g)[0];
            let roomPositions = positions[itemBelongsToRoom] ? positions[itemBelongsToRoom] : { x: 0, y: 0 };
            let currentRoomDimensions = originalDimensions[itemBelongsToRoom] ? originalDimensions[itemBelongsToRoom] : {
                height: roomDimensions[roomId]?.height ? roomDimensions[roomId].height : 4000,
                width: roomDimensions[roomId]?.width ? roomDimensions[roomId].width : 4000
            }

            let wall1Position = {
                minX: roomPositions.x - 40,
                maxX: roomPositions.x,
                minY: roomPositions.y - 30,
                maxY: roomPositions.y + (+currentRoomDimensions.height) //room dimension
            }
            let wall2Position = {
                minX: roomPositions.x - 50,
                maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension
                minY: roomPositions.y - 40,
                maxY: roomPositions.y
            }
            let wall3Position = {
                minX: roomPositions.x + (+currentRoomDimensions.width) - 30, //room dimension
                maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension + 40
                minY: roomPositions.y - 50,
                maxY: roomPositions.y + (+currentRoomDimensions.height) //room dimension
            }
            let wall4Position = {
                minX: roomPositions.x - 50,
                maxX: roomPositions.x + (+currentRoomDimensions.width),    //room dimension
                minY: roomPositions.y + (+currentRoomDimensions.height) - 60,
                maxY: roomPositions.y + (+currentRoomDimensions.height)
            }
            let wall = 0;
            if (itemPosition.x < wall1Position.maxX && itemPosition.x > wall1Position.minX && itemPosition.y < wall1Position.maxY && itemPosition.y > wall1Position.minY) {
                wall = 1;
            }
            else if (itemPosition.x < wall2Position.maxX && itemPosition.x > wall2Position.minX && itemPosition.y < wall2Position.maxY && itemPosition.y > wall2Position.minY) {
                wall = 2;
            }
            else if (itemPosition.x < wall3Position.maxX && itemPosition.x > wall3Position.minX && itemPosition.y < wall3Position.maxY && itemPosition.y > wall3Position.minY) {
                wall = 3;
            }
            else if (itemPosition.x < wall4Position.maxX && itemPosition.x > wall4Position.minX && itemPosition.y < wall4Position.maxY && itemPosition.y > wall4Position.minY) {
                wall = 4;
            }
            setItemBelongsTo({
                ...itemBelongsTo,
                [id]: {
                    ...itemBelongsTo[id],
                    wall: wall
                }
            })
        }
    }

    //if any values are saved initially then to load that values
    useEffect(() => {
        //values to set 
        let x = positions[id]?.x ? positions[id].x : 0;
        let y = positions[id]?.y ? positions[id].y : 0;

        //setting offsets in animated values
        translateY.setOffset(y);
        translateX.setOffset(x);

        //setting offsets
        lastOffset.y = y;
        lastOffset.x = x;
    }, []);


    //drag offsets
    let { lastOffset } = useMemoOne(() => ({
        lastOffset: {
            x: 0,
            y: 0
        }
    }), []);

    // let { snapStateX } = useMemoOne(() => ({
    //     snapStateX: {
    //         horizon: {flag: false, pos: 0},
    //         vertical: {flag: false, pos: 0}
    //     }
    // }), []);

    let snapStateX = {
        left: false,
        right: false
    };
    let snapStateY = {
        top: false,
        bottom: false
    };

    //animated values
    const { translateX, translateY } = useMemoOne(() => ({
        translateX: new Animated.Value(location ? location.x : 0),
        translateY: new Animated.Value(location ? location.y : 0),
    }), []);
    // interpolations for snapping to grid 
    const interpolatedX = translateX.interpolate({
        inputRange: generateRange('x', true),    //range is defined in Range.js
        outputRange: generateRange('x', false),   //op range
        extrapolate: 'clamp'
    });
    const interpolatedY = translateY.interpolate({
        inputRange: generateRange('y', true),    //range is defined in Range.js
        outputRange: generateRange('y', false),   //op range
        extrapolate: 'clamp'
    });
    const onGestureEvent = (evt) => {
        if (evt.nativeEvent.state === State.ACTIVE) {
            let { translationX, translationY } = evt.nativeEvent;
            let curPosX = lastOffset.x + translationX;
            let curPosY = lastOffset.y + translationY;
            let snapX_L, snapX_R = 0;
            let snapY_T, snapY_B = 0;
            if (ableToSnap(id)) {
                let prevX = {...snapStateX};
                let prevY = {...snapStateY};
                let width = originalDimensions[id].width;
                let height = originalDimensions[id].height;
                if ((snapX_L = hitInSnapRangeX(curPosX)) !== false) {
                    if (snapX_L != snapStateX.left) {
                        snapStateX.left = snapX_L
                    }
                }
                if ((snapX_R = hitInSnapRangeX(curPosX + width)) !== false) {
                    if (snapX_R != snapStateX.right) {
                        snapStateX.right = snapX_R
                    }
                }
                if ((snapY_T = hitInSnapRangeY(curPosY)) !== false) {
                    if (snapY_T != snapStateY.left) {
                        snapStateY.top = snapY_T
                    }
                }
                if ((snapY_B = hitInSnapRangeY(curPosY + height)) !== false) {
                    if (snapY_B != snapStateY.right) {
                        snapStateY.bottom = snapY_B
                    }
                }
                if (!snapX_L)
                    snapStateX.left = false
                if (!snapX_R)
                    snapStateX.right = false
                if (!snapY_T)
                    snapStateY.top = false
                if (!snapY_B)
                    snapStateY.bottom = false

                if (snapX_L || snapX_R) {
                    if (snapX_L && snapX_R) {
                        translationX = snapX_L - lastOffset.x;
                        if (snapX_L + width != snapX_R) {
                            snapStateX.right = false
                        }
                    } else if (snapX_L) {
                        translationX = snapX_L - lastOffset.x;
                    } else {
                        translationX = snapX_R - width - lastOffset.x;
                    }
                }
                if (snapY_T || snapY_B) {
                    if (snapY_T && snapY_B) {
                        translationY = snapY_T - lastOffset.y;
                        if (snapY_T + height != snapY_B) {
                            snapStateY.bottom = false
                        }
                    } else if (snapY_T) {
                        translationY = snapY_T - lastOffset.y;
                    } else {
                        translationY = snapY_B - height - lastOffset.y;
                    }
                }
                if (prevX.left !== snapStateX.left || prevX.right !== snapStateX.right)
                    setSnapGridX({flag: true, pos: [snapStateX.left, snapStateX.right]});
                if (prevY.top !== snapStateY.top || prevY.bottom !== snapStateY.bottom)
                    setSnapGridY({flag: true, pos: [snapStateY.top, snapStateY.bottom]});
            } 
            if (!snapX_L && !snapX_R) {
                if (snapStateX.left !== false || snapStateX.right !== false)
                    resetSnapGridXY();
                snapStateX.left = false;
                snapStateX.right = false;
            }   
            if (!snapY_T && !snapY_B) {
                if (snapStateY.top !== false || snapStateY.bottom !== false)
                    resetSnapGridXY();
                snapStateY.top = false;
                snapStateY.bottom = false;
            }   

            translateX.setValue(translationX);
            translateY.setValue(translationY);
            onDrag(evt.nativeEvent);    //on drag event 
        }
    }

    function onHandlerStateChange(event) {
        let { translationX, translationY } = event.nativeEvent;
        // console.log(translationX, translationY);


        if (event.nativeEvent.state === State.ACTIVE) {
            setRanges(previousState => !previousState);
            onDrag(event.nativeEvent); //drag started 
        }

        if (event.nativeEvent.oldState === State.ACTIVE) {
            console.log(originalDimensions);
            resetSnapGridXY();
            if (originalDimensions[id]) {
                let width = originalDimensions[id].width;
                let height = originalDimensions[id].height;
                if (snapStateX.left !== false)
                    translationX = snapStateX.left - lastOffset.x;   
                if (snapStateX.right !== false)
                    translationX = snapStateX.right - width - lastOffset.x;   
                snapStateX = {left: false, right: false}

                if (snapStateY.top !== false)
                    translationY = snapStateY.top - lastOffset.y;   
                if (snapStateY.bottom !== false)
                    translationY = snapStateY.bottom - height - lastOffset.y;   

                snapStateY = {top: false, bottom: false}
            }

            lastOffset.x += translationX;
            lastOffset.y += translationY;
            //    console.log(typeof())
            // console.log(JSON.stringify(interpolatedX), " , ", JSON.stringify(interpolatedY))
            // console.log(JSON.stringify(lastOffset.x), " , ", JSON.stringify(lastOffset.y))

            // lastOffset.x = +JSON.stringify(interpolatedX);
            // lastOffset.y = +JSON.stringify(interpolatedY);

            // lastOffset.x = Math.floor((lastOffset.x + 1) / 10) * 10;
            // lastOffset.y = Math.floor((lastOffset.y + 1) / 10) * 10;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
            onDragRelease(event.nativeEvent, lastOffset);
        }
    }
    function ableToSnap(id)
    {
        if (id.includes('defaultRoom') ||
            id.includes('bulkHead') ||
            id.includes('bathhob') ||
            id.includes('voids')) {
            return true;
        }
        return false;
    }
    function hitInSnapRangeX(posX)
    {
        var snapXArr = [];
        var dist = 0;
        Object.keys(positions).map((eId, index) => {
            if (ableToSnap(eId) && eId != id) {
                var tWidth = originalDimensions[eId].width;
                let tPosX_LC = positions[eId]['x'];
                let tPosX_RC = tPosX_LC + tWidth;
                if ((dist = Math.abs(tPosX_LC - posX)) <= 10)
                    snapXArr.push({distance: dist, position: tPosX_LC});
                if ((dist = Math.abs(tPosX_RC - posX)) <= 10)
                    snapXArr.push({distance: dist, position: tPosX_RC});
            }
        })
        if (snapXArr.length > 0) {
            snapXArr.sort(function (a, b) { return a.distance - b.distance; });
            return snapXArr[0].position;
        } else {
            return false;
        }
    }
    function hitInSnapRangeY(posY)
    {
        var snapXArr = [];
        var dist = 0;
        Object.keys(positions).map((eId, index) => {
            if (ableToSnap(eId) && eId != id) {
                var tHeight = originalDimensions[eId].height;
                let tPosY_TC = positions[eId]['y'];
                let tPosY_BC = tPosY_TC + tHeight;
                if ((dist = Math.abs(tPosY_TC - posY)) <= 10)
                    snapXArr.push({distance: dist, position: tPosY_TC});
                if ((dist = Math.abs(tPosY_BC - posY)) <= 10)
                    snapXArr.push({distance: dist, position: tPosY_BC});
            }
        })
        if (snapXArr.length > 0) {
            snapXArr.sort(function (a, b) { return a.distance - b.distance; });
            return snapXArr[0].position;
        } else {
            return false;
        }
    }

    function generateRange(type, operation) {
        // console.log("Generating new range");
        //type -> x, y -> string
        //ip -> true op-> false -> bool
        let rangeArr = [];
        Object.keys(originalDimensions).map((roomId, index) => {
            if (roomId.includes('defaultRoom') && roomId !== id) {
                if (positions[roomId]) {
                    if (operation) {
                        //input range
                        let coordinates = getRangeElems(positions[roomId][type]);
                        let newCoordinates;

                        if (type === 'x') {
                            newCoordinates = getRangeElems(+originalDimensions[roomId].width + +positions[roomId].x);
                        }
                        else {
                            newCoordinates = getRangeElems(+originalDimensions[roomId].height + +positions[roomId].y);
                        }

                        rangeArr = rangeArr.concat(coordinates);
                        rangeArr = rangeArr.concat(newCoordinates);
                    }
                    else {
                        //output range
                        let coordinate = positions[roomId][type];
                        rangeArr.push(coordinate);
                        rangeArr.push(coordinate);

                        if (type === 'x') {
                            rangeArr.push(+originalDimensions[roomId].width + +positions[roomId].x);
                            rangeArr.push(+originalDimensions[roomId].width + +positions[roomId].x);
                        }
                        else {
                            rangeArr.push(+originalDimensions[roomId].height + +positions[roomId].y);
                            rangeArr.push(+originalDimensions[roomId].height + +positions[roomId].y);
                        }
                    }
                }
            }
        })
        rangeArr.unshift(-1000);
        rangeArr.push(1000);

        rangeArr = sortArr(rangeArr);
        return rangeArr;
    }
    function sortArr(numbers) {
        let newNumbers = numbers.sort((a, b) => a - b)
        return newNumbers;
    }

    function getRangeElems(num) {
        let a, b;
        a = num - 5;
        b = num + 5;
        return [a, b];
    }

    //on drag event
    function onDrag(nativeEvent) {
        if (isTrashable(nativeEvent)) setZoomDeleteIcon(true);
        else setZoomDeleteIcon(false);
        setIsDragging(true);   //hide the trash icon
    }  
    //on drag release function
    function onDragRelease(nativeEvent, position) {
        let newPositions = positions;
        newPositions[id] = {
            x: position.x,
            y: position.y
        }
        setPosition(newPositions);
        checkDoorWindows(newPositions[id]);
        setIsDragging(false);    //-> this flags shows the delete button
        if (isTrashable(nativeEvent)) {
            setIsElementTrashable(true);    //-> element is trashable
            setIsDraggingIndex(id); //=> this id is trashable
        }
    }

    let pan = 
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            maxPointers={2}
            minPointers={1} 
            enabled={isDraggable && !isRotate && !artboardDraggable}
        >
            <Animated.View style={[{
                top: 0,
                left: 0,
                position: 'absolute',   
                transform: [
                    { translateX: translateX },
                    { translateY: translateY },
                ],
            }]}>
                <Fragment>
                    {children}
                </Fragment>
            </Animated.View>
        </PanGestureHandler>
    // pan.onHandlerStateChange(0)
    return pan
}

const mapStateToProps = () => state => ({
    positions: state.Options.positions,
    isSnapping: state.Options.isSnapping,   //Own Code
    itemBelongsTo: state.Options.itemBelongsTo,
    dimensions: state.Options.dimensions,
    originalDimensions: state.Options.currentDimensions,
    artboardDraggable: state.Options.artboardDraggable
});

const mapDispatchToProps = () => dispatch => ({
    setSnapGridX: (flag) => dispatch(setSnapGridX(flag)),     //Own Code
    setSnapGridY: (flag) => dispatch(setSnapGridY(flag)),     //Own Code
    resetSnapGridXY: () => dispatch(resetSnapGridXY()),               //Own Code
    setPosition: (position) => dispatch(setPosition(position)),
    setItemBelongsTo: (payload) => dispatch(setItemBelongsTo(payload)),
    setOriginalDimensions: (currentDimensions) => dispatch(setCurrentDimensions(currentDimensions))
})

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);