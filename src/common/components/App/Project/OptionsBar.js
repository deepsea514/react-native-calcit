import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//redux imports
import { connect } from 'react-redux';
import {
    setShowOptions,
    setFlips,
    deleteOptions,
    setChildrenElements,
} from '../../../../actions/OptionActions';

//constants
import Colors from '../../../consts/Colors';

function OptionsBar(props) {

    let {
        showOptions,
        styles,
        setRoomAddition,
        setShowOptions,
        setDimensionsVisible,
        deleteOptions,
        artboardDraggable,
        childrenElements,
        setChildrenElements,
        flips,
        setFlips
    } = props;

    if (showOptions.isVisible) {
        return (
            <View style={styles.showRoomOptionsContainer}>
                {
                    !showOptions.id.includes('arrow') && (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.optionButton, {
                                    backgroundColor: artboardDraggable ? '#999' : (
                                        showOptions.selectedOption === 'stretch' ? (Colors.primary) : (Colors.textDark)
                                    )
                                }
                                ]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'stretch'
                                    })
                                }}
                                disabled={artboardDraggable}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Stretch
                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'notes' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'notes'
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Notes
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'rotateSlider' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'rotateSlider'
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Rotate With Slider
                            </Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
                {
                    showOptions.id.includes('Room') && (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'hide/showLabel' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    let newLabels = [...showOptions.labels];
                                    let index = newLabels.findIndex(e => e.id === showOptions.id);
                                    if (index !== -1) {
                                        newLabels[index].currentLabel = newLabels[index].currentLabel === 'Show' ? ('Hide') : ('Show');
                                    }
                                    else {
                                        newLabels.push({
                                            id: showOptions.id,
                                            currentLabel: 'Show'
                                        })
                                    }
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'hide/showLabel',
                                        labels: newLabels
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    {getLabel()} Label
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'textures' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'textures',
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Textures
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'cType' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'cType',
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Ceiling
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [
                                        styles.optionButton,
                                        { backgroundColor: showOptions.selectedOption === 'editLabel' ? (Colors.primary) : (Colors.textDark) }
                                    ]
                                }
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'editLabel'
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Edit Label
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton]}
                                onPress={() => {
                                    setRoomAddition(true);
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText]}
                                >
                                    Room Additions
                            </Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
                {
                    showOptions.id.includes('item') && (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'flipVert' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'flipVert'
                                    });
                                    setFlipsNow(showOptions.id);
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText,]}
                                >
                                    Flip
                            </Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
                {
                    (showOptions.id.includes('doors') || showOptions.id.includes('windows')) && (
                        <Fragment>
                            <TouchableOpacity
                                style={[styles.optionButton]}
                                onPress={() => {
                                    setDimensionsVisible(true)
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText]}
                                >
                                    Dimensions
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, { backgroundColor: showOptions.selectedOption === 'mType' ? (Colors.primary) : (Colors.textDark) }]}
                                onPress={() => {
                                    setShowOptions({
                                        ...showOptions,
                                        selectedOption: 'mType',
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.optionButtonText]}
                                >
                                    Material Type
                                        </Text>
                            </TouchableOpacity>
                        </Fragment>
                    )
                }
                {
                    showOptions.id.includes('arrow') && (
                        <TouchableOpacity
                            style={[styles.optionButton, {
                                backgroundColor: artboardDraggable ? '#999' : (
                                    showOptions.selectedOption === 'arrowLength' ? (Colors.primary) : (Colors.textDark)
                                )
                            }]}
                            onPress={() => {
                                setShowOptions({
                                    ...showOptions,
                                    selectedOption: 'arrowLength'
                                })
                            }}
                            disabled={artboardDraggable}
                        >
                            <Text
                                style={[styles.optionButtonText,]}
                            >
                                Length
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {
                    showOptions.id.includes('arrow') && (
                        <TouchableOpacity
                            style={[styles.optionButton, {
                                backgroundColor: artboardDraggable ? '#999' : (
                                    showOptions.selectedOption === 'arrowCurve' ? (Colors.primary) : (Colors.textDark)
                                )
                            }]}
                            onPress={() => {
                                setShowOptions({
                                    ...showOptions,
                                    selectedOption: 'arrowCurve'
                                })
                            }}
                            disabled={artboardDraggable}
                        >
                            <Text
                                style={[styles.optionButtonText,]}
                            >
                                Arrow Curve
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {
                    showOptions.id.includes('arrow') && (
                        <TouchableOpacity
                            style={[styles.optionButton, {
                                backgroundColor: artboardDraggable ? '#999' : (
                                    showOptions.selectedOption === 'arrowWidth' ? (Colors.primary) : (Colors.textDark)
                                )
                            }]}
                            onPress={() => {
                                setShowOptions({
                                    ...showOptions,
                                    selectedOption: 'arrowWidth'
                                })
                            }}
                            disabled={artboardDraggable}
                        >
                            <Text
                                style={[styles.optionButtonText,]}
                            >
                                Arrow Size
                            </Text>
                        </TouchableOpacity>
                    )
                }


                <TouchableOpacity
                    style={[styles.optionButton, {
                        backgroundColor: artboardDraggable ? '#999' : (
                            showOptions.selectedOption === 'drag' ? (Colors.primary) : (Colors.textDark)
                        )
                    }]}
                    onPress={() => {
                        setShowOptions({
                            ...showOptions,
                            selectedOption: 'drag'
                        })
                    }}
                    disabled={artboardDraggable}
                >
                    <Text
                        style={[styles.optionButtonText,]}
                    >
                        Drag
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        let newChildren = [...childrenElements];
                        let index = newChildren.findIndex(e => e.props.id === showOptions.id);
                        if (index !== -1) {
                            deleteOptions(showOptions.id);
                            newChildren.splice(index, 1)
                            setChildrenElements(newChildren);
                        }
                        setShowOptions({
                            ...showOptions,
                            selectedOption: '',
                            isVisible: false,
                            id: null
                        });
                    }}
                >
                    <Text
                        style={[styles.optionButtonText]}
                    >
                        Delete
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        setShowOptions({
                            ...showOptions,
                            selectedOption: '',
                            isVisible: false,
                            id: null
                        })
                    }}
                >
                    <Text
                        style={[styles.optionButtonText]}
                    >
                        Close
                            </Text>
                </TouchableOpacity>
            </View>
        )
    }
    else return null

    function setFlipsNow(id) {
        setFlips({
            ...flips,
            [id]: !flips[id]
        })
    }

    function getLabel() {
        let index = showOptions.labels.findIndex(e => e.id === showOptions.id);
        if (index !== -1) return showOptions.labels[index].currentLabel;
        else return 'Hide';
    }
}

const mapStateToProps = () => state => ({
    showOptions: state.Options.showOptions,
    artboardDraggable: state.Options.artboardDraggable,
    childrenElements: state.Options.childrenElements,
    flips: state.Options.flips,
})


const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options)),
    setFlips: (flips) => dispatch(setFlips(flips)),
    deleteOptions: (id) => dispatch(deleteOptions(id)),
    setChildrenElements: (elements) => dispatch(setChildrenElements(elements)),
})


export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar);



///Other case

// {
//     props.showOptions.isVisible && (
//         <View style={styles.showRoomOptionsContainer}>
//             <TouchableOpacity
//                 style={[styles.optionButton, {
//                     backgroundColor: artboardDraggable ? '#999' : (
//                         props.showOptions.selectedOption === 'stretch' ? (Colors.primary) : (Colors.textDark)
//                     )
//                 }
//                 ]}
//                 onPress={() => {
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: 'stretch'
//                     })
//                 }}
//                 disabled={artboardDraggable}
//             >
//                 <Text
//                     style={[styles.optionButtonText,]}
//                 >
//                     Stretch
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'notes' ? (Colors.primary) : (Colors.textDark) }]}
//                 onPress={() => {
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: 'notes'
//                     })
//                 }}
//             >
//                 <Text
//                     style={[styles.optionButtonText,]}
//                 >
//                     Notes
//                 </Text>
//             </TouchableOpacity>
//             {
//                 props.showOptions.id.includes('Room') && (
//                     <Fragment>
//                         <TouchableOpacity
//                             style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'hide/showLabel' ? (Colors.primary) : (Colors.textDark) }]}
//                             onPress={() => {
//                                 let newLabels = [...props.showOptions.labels];
//                                 let index = newLabels.findIndex(e => e.id === props.showOptions.id);
//                                 if (index !== -1) {
//                                     newLabels[index].currentLabel = newLabels[index].currentLabel === 'Show' ? ('Hide') : ('Show');
//                                 }
//                                 else {
//                                     newLabels.push({
//                                         id: props.showOptions.id,
//                                         currentLabel: 'Show'
//                                     })
//                                 }
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'hide/showLabel',
//                                     labels: newLabels
//                                 })
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText,]}
//                             >
//                                 {getLabel()} Label
//                 </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'textures' ? (Colors.primary) : (Colors.textDark) }]}
//                             onPress={() => {
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'textures',
//                                 })
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText,]}
//                             >
//                                 Textures
//                 </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'cType' ? (Colors.primary) : (Colors.textDark) }]}
//                             onPress={() => {
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'cType',
//                                 })
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText,]}
//                             >
//                                 Ceiling
//                 </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={
//                                 [
//                                     styles.optionButton,
//                                     { backgroundColor: props.showOptions.selectedOption === 'editLabel' ? (Colors.primary) : (Colors.textDark) }
//                                 ]
//                             }
//                             onPress={() => {
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'editLabel'
//                                 })
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText,]}
//                             >
//                                 Edit Label
//                 </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[styles.optionButton]}
//                             onPress={() => {
//                                 setRoomAddition(true);
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText]}
//                             >
//                                 Room Additions
//                 </Text>
//                         </TouchableOpacity>
//                     </Fragment>
//                 )
//             }
//             {
//                 props.showOptions.id.includes('item') && (
//                     <Fragment>
//                         <TouchableOpacity
//                             style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'flipVert' ? (Colors.primary) : (Colors.textDark) }]}
//                             onPress={() => {
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'flipVert'
//                                 });
//                                 setFlipsNow(props.showOptions.id);
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText,]}
//                             >
//                                 Flip
//                 </Text>
//                         </TouchableOpacity>
//                     </Fragment>
//                 )
//             }
//             {
//                 (props.showOptions.id.includes('doors') || props.showOptions.id.includes('windows')) && (
//                     <Fragment>
//                         <TouchableOpacity
//                             style={[styles.optionButton]}
//                             onPress={() => {
//                                 setDimensionsVisible(true)
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText]}
//                             >
//                                 Dimensions
//                 </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'mType' ? (Colors.primary) : (Colors.textDark) }]}
//                             onPress={() => {
//                                 props.setShowOptions({
//                                     ...props.showOptions,
//                                     selectedOption: 'mType',
//                                 })
//                             }}
//                         >
//                             <Text
//                                 style={[styles.optionButtonText]}
//                             >
//                                 Material Type
//                             </Text>
//                         </TouchableOpacity>
//                     </Fragment>
//                 )
//             }

//             <TouchableOpacity
//                 style={[styles.optionButton, { backgroundColor: props.showOptions.selectedOption === 'rotateSlider' ? (Colors.primary) : (Colors.textDark) }]}
//                 onPress={() => {
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: 'rotateSlider'
//                     })
//                 }}
//             >
//                 <Text
//                     style={[styles.optionButtonText,]}
//                 >
//                     Rotate With Slider
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={[styles.optionButton, {
//                     backgroundColor: artboardDraggable ? '#999' : (
//                         props.showOptions.selectedOption === 'drag' ? (Colors.primary) : (Colors.textDark)
//                     )
//                 }]}
//                 onPress={() => {
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: 'drag'
//                     })
//                 }}
//                 disabled={artboardDraggable}
//             >
//                 <Text
//                     style={[styles.optionButtonText,]}
//                 >
//                     Drag
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={styles.optionButton}
//                 onPress={() => {
//                     let newChildren = [...childrenElements];
//                     let index = newChildren.findIndex(e => e.props.id === props.showOptions.id);
//                     if (index !== -1) {
//                         props.deleteOptions(props.showOptions.id);
//                         newChildren.splice(index, 1)
//                         setChildrenElements(newChildren);
//                     }
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: '',
//                         isVisible: false,
//                         id: null
//                     });
//                 }}
//             >
//                 <Text
//                     style={[styles.optionButtonText]}
//                 >
//                     Delete
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={styles.optionButton}
//                 onPress={() => {
//                     props.setShowOptions({
//                         ...props.showOptions,
//                         selectedOption: '',
//                         isVisible: false,
//                         id: null
//                     })
//                 }}
//             >
//                 <Text
//                     style={[styles.optionButtonText]}
//                 >
//                     Close
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }