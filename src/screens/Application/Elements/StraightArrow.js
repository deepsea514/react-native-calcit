import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, Text } from 'react-native';

//draggable, rotatable, zoomable
import ElementContainer from './ElementContainer';
import Slider from '@react-native-community/slider';

import Colors from '../../../common/consts/Colors';

//svg
import Svg, { Defs, Marker, Rect, Path } from 'react-native-svg';

//redux imports
import { connect } from 'react-redux';
import { setShowOptions } from '../../../actions/OptionActions'

const { createAnimatedComponent } = Animated;

let AnimatedPath = createAnimatedComponent(Path);

function StraightArrow(props) {

    const MIN_LENGTH = 40;
    const MAX_LENGTH = 200;

    const MIN_CURVE = -100;
    const MAX_CURVE = 280;
    const AVG_CURVE = 100;

    const {
        setIsDragging,
        setIsDraggingIndex,
        setIsElementTrashable,
        id,
        setZoomDeleteIcon,

        setParentOptions,
        showOptions
    } = props;

    const [startingPoint, setStartingPoint] = useState({
        x: 0,
        y: 100
    });

    const [endingPoint, setEndingPoint] = useState({
        x: MIN_LENGTH, 
        y: 100
    })

    const [controlPoint, setControlPoint] = useState({
        x: (+startingPoint.x + +endingPoint.x) / 2,
        y: AVG_CURVE
    });

    const [arrowWidth, setArrowWidth] = useState(5);

    return (
        <View style={{ alignItems: 'center' }}>

            <ElementContainer
                setIsDragging={setIsDragging}
                setIsDraggingIndex={setIsDraggingIndex}
                setIsElementTrashable={setIsElementTrashable}
                id={id}
                setZoomDeleteIcon={setZoomDeleteIcon}
                isDraggable={(showOptions.selectedOption === 'arrowLength' || showOptions.selectedOption === 'arrowCurve' || showOptions.selectedOption === 'arrowWidth') ? false : true}
                isRotate={false}
                isScalable={false}
            >
                <TouchableOpacity
                    style={[styles.arrowContainer, {
                        width: endingPoint.x
                    }]}
                    onPress={() => {
                        setParentOptions({
                            ...showOptions,
                            isVisible: true,
                            id,
                            selectedOption: ''
                        });
                    }}
                >
                    <Svg width={endingPoint.x} height="200" viewBox={`0 0 ${+endingPoint.x + 40} 200`}>
                        <Defs>
                            <Marker
                                id="Triangle"
                                viewBox="0 0 10 10"
                                refX="0"
                                refY="5"
                                markerUnits="strokeWidth"
                                markerWidth="4"
                                markerHeight="3"
                                orient="auto"
                            >
                                <Path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
                            </Marker>
                        </Defs>
                        <AnimatedPath
                            d={`
                                    M ${startingPoint.x}, ${startingPoint.y} 
                                    Q ${controlPoint.x}, ${controlPoint.y}, 
                                    ${endingPoint.x}, ${endingPoint.y}
                            `}
                            fill="none"
                            stroke="black"
                            strokeWidth={arrowWidth}
                            markerEnd="url(#Triangle)"
                        />
                    </Svg>
                </TouchableOpacity>

                <View style={{
                    position: 'absolute',
                    bottom: 0
                }}>
                    {
                        showOptions.selectedOption === 'arrowLength' && showOptions.id === id && (
                            <View style={styles.sliderContainer}>
                                <Slider
                                    step={5}
                                    minimumValue={MIN_LENGTH}
                                    maximumValue={MAX_LENGTH}
                                    style={{ height: 40, width: 120, alignSelf: 'center' }}
                                    minimumTrackTintColor={Colors.primary}
                                    thumbTintColor={Colors.primary}
                                    value={endingPoint.x}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(value) => {
                                        setEndingPoint({
                                            ...endingPoint,
                                            x: value
                                        })
                                        setControlPoint({
                                            ...controlPoint,
                                            x: (+startingPoint.x + +endingPoint.x) / 2,
                                        })
                                    }}
                                />
                            </View>
                        )
                    }
                    {
                        showOptions.selectedOption === 'arrowCurve' && showOptions.id === id && (
                            <View style={styles.sliderContainer}>
                                <Slider
                                    step={2}
                                    minimumValue={MIN_CURVE}
                                    maximumValue={MAX_CURVE}
                                    value={controlPoint.y}
                                    style={{ height: 40, width: 120, alignSelf: 'center' }}
                                    minimumTrackTintColor={Colors.primary}
                                    thumbTintColor={Colors.primary}
                                    value={endingPoint.x}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(value) => {
                                        setControlPoint({
                                            ...controlPoint,
                                            x: (+startingPoint.x + +endingPoint.x) / 2,
                                            y: value
                                        })
                                    }}
                                />
                            </View>
                        )
                    }
                    {
                        showOptions.selectedOption === 'arrowWidth' && showOptions.id === id && (
                            <View style={styles.sliderContainer}>
                                <Slider
                                    step={1}
                                    minimumValue={2}
                                    maximumValue={10}
                                    value={controlPoint.y}
                                    style={{ height: 40, width: 120, alignSelf: 'center' }}
                                    minimumTrackTintColor={Colors.primary}
                                    thumbTintColor={Colors.primary}
                                    value={endingPoint.x}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(value) => {
                                        setArrowWidth(value)
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
            </ElementContainer>
        </View>
    )
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions,
});

const mapDispatchToProps = () => dispatch => ({
    setParentOptions: (options) => dispatch(setShowOptions(options)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StraightArrow);


const styles = StyleSheet.create({
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
    arrowContainer: {
        overflow: 'hidden',
        height: 200,
        width: 200
    }
})





// import React from "react";
// import { StyleSheet, View } from "react-native";
// import PropTypes from "prop-types";

// function Arrow({ size, color }) {
//     const arrowWidth = size / 3.5;

//     const styles = StyleSheet.create({
//         container: {
//             backgroundColor: "transparent",
//             overflow: "visible",
//             width: size * 1.9,
//             height: size * 1.6
//         },
//         arrowTail: {
//             backgroundColor: color,
//             width: size * 2,
//             height: arrowWidth,
//             left: size * 0.4,
//             borderTopColor: "transparent",
//             borderStyle: "solid",
//             position: "absolute",
//             top: size * 0.65
//         },
//         arrowHead2: {
//             backgroundColor: color,
//             width: size,
//             height: arrowWidth,
//             borderTopColor: "transparent",
//             borderStyle: "solid",
//             transform: [{ rotate: "45deg" }],
//             position: "absolute",
//             top: size * 0.9
//         },
//         arrowHead1: {
//             backgroundColor: color,
//             width: size,
//             height: arrowWidth,
//             borderTopColor: "transparent",
//             borderStyle: "solid",
//             transform: [{ rotate: "135deg" }],
//             position: "absolute",
//             top: size * 0.4
//         },
//         initalPoint: {
//             height: arrowWidth * 2,
//             width: 10,
//             position: 'absolute',
//             backgroundColor: '#a0a',
//             top: size * 0.65

//         }
//     });

//     return (
//         <View style={styles.container}>
//             <View style={styles.initalPoint} />
//             <View style={styles.arrowHead1} />
//             <View style={styles.arrowHead2} />
//             <View style={styles.arrowTail} />


//         </View>
//     );
// };

// Arrow.propTypes = {
//     size: PropTypes.number,
//     color: PropTypes.string
// };

// Arrow.defaultProps = {
//     size: 20,
//     color: '#000'
// };
// export default Arrow;