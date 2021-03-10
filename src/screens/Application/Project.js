import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'
//components

import {
    View,
    Dimensions,
    Alert,
    Animated,
    StyleSheet,
    Platform,
    Image,
    BackHandler
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//styles
import styles from '../../common/styles/ProjectScreenStyles';

import SnapGridLine from '../../common/components/App/Project/SnapGridLine';
//custom components
import IconButton from '../../common/components/App/Project/IconButton';
import CanvasLoader from '../../common/components/App/Project/CanvasLoader';

//bottom bars
import BottomBar from '../../common/components/App/Project/BottomBar';
import Toolbar from '../../common/components/App/Project/Toolbar';
import BottomOptionsBar from '../../common/components/App/Project/BottomOptionsBar';

//right bars
import TexturesBar from '../../common/components/App/Project/RightBars/TexturesBar';
import MaterialsBar from '../../common/components/App/Project/RightBars/MaterialsBar';
import CeilingsBar from '../../common/components/App/Project/RightBars/CeilingsBar';

//consts
import Colors from '../../common/consts/Colors';

//modals
import SettingsModal from '../../common/components/App/Project/SettingsModal';
import AddModal from '../../common/components/App/Project/AddModal';
import RoomDetailsModal from '../../common/components/App/Project/RoomDetailsModal';
import ItemsToolbar from '../../common/components/App/Project/ItemsModal';
import AddRoomAddition, { addRoom as reGenerateAddition } from '../../common/components/App/Project/RoomAdditions';
import DimensionsModal from '../../common/components/App/Project/Dimensions';

//sketch
import FreeDraw from './Elements/FreeDraw';
import SprayDraw from './Elements/SprayDraw';
import AskRoomDetailOrDefault from '../../common/components/App/Project/AskRoomDetailOrDefault';

//react native shot
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import RNFetchBlob from 'rn-fetch-blob';

import HtmlPdf from './Elements/HtmlPdf';

//default imports
import DefaultRoom from './Elements/DefaultRoom';
import { connect } from 'react-redux';
import {
    setArtboardDraggable,
    setShowOptions,
    deleteOptions,
    setChildrenElements,
    setLastScale,
    setFlips,
    setItemBelongsTo,
    updateVisibilityItems,
} from '../../actions/OptionActions';
import { getProjects, saveProject, getProjectState, togglePdfLoader } from '../../actions/ProjectActions';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Items from '../../common/consts/Items';
import OptionsBar from '../../common/components/App/Project/OptionsBar';

//loading icon font
FontAwesome.loadFont();

function Project(props) {

    //states
    const [settingsModalVisible, setSettingsModalVisible] = useState(false); //settings modal
    const [addModalVisible, setAddModalVisible] = useState(false);           //add modal
    const [roomDetailsVisible, setRoomDetailsVisible] = useState(false);    //add roomdetails modal
    const [askRoomDefaultVisible, setAskRoomDefaultVisible] = useState(false); //ask room details or default modal
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);               //toolbar flag
    const [isItemsToolbarOpen, setIsItemsToolbarOpen] = useState(false);
    const [roomType, setRoomType] = useState('custom');  //currentRoom type
    const [roomAddition, setRoomAddition] = useState(false);
    const [dimensionsVisible, setDimensionsVisible] = useState(false);

    //current dimensions of the screen
    const [currentDimensions, setCurrentDimensions] = useState({
        WIDTH: Dimensions.get('window').width,  //widht -> current screen
        HEIGHT: Dimensions.get('window').height //height -> current screen
    });

    let {
        artboardDraggable,
        setArtboardDraggable,
        childrenElements,
        setChildrenElements,
        setLastScale,
        flips,
        isGeneratingPDF,
        setIsGeneratingPDF
    } = props;

    const positions = useSelector(state => state.Options.positions);

    const [toggleDimensions, setToggleDimensions] = useState(false);

    //dragging states
    const [isDragging, setIsDragging] = useState(false);    //children components
    const [isDraggingIndex, setIsDraggingIndex] = useState(false);  //children components
    const [isEelmentTrashable, setIsElementTrashable] = useState(false); //children components
    const [zoomDeleteIcon, setZoomDeleteIcon] = useState(false); //children components

    //free draw states
    const [isFreeDraw, setIsFreeDraw] = useState(false);
    const [isSprayDraw, setIsSprayDraw] = useState(false);

    const [freeDrawStroke, setFreeDrawStroke] = useState(4);    //FreeDraw.js
    const [freeDrawColor, setFreeDrawColor] = useState('#000000');  //FreeDraw.js

    const [sprayDrawStroke, setSprayDrawStroke] = useState(4);    //SprayDraw.js
    const [sprayDrawColor, setSprayDrawColor] = useState('#000000');  //SprayDraw.js
    const [sprayDrawDensity, setSprayDrawDensity] = useState(4);
    //eraser states 
    const [isEraser, setIsEraser] = useState(false);
    const [eraserStroke, setEraserStroke] = useState(4);

    //aniamted bottom toolbar values
    const toolBarTranslate = useRef(new Animated.Value(1500)).current;
    const bottomBarTranslate = useRef(new Animated.Value(80)).current;
    const canvasRef = useRef();

    //animated delete button value
    const deleteViewOpacity = useRef(new Animated.Value(1)).current;
    const deleteViewScale = useRef(new Animated.Value(1)).current;

    //animated items toolbar values
    const itemsToolbarTranslate = useRef(new Animated.Value(500)).current;

    //view shot ref
    const viewShotRef = useRef();

    const options = {
        title: 'Select Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
            quality: 0.2
        }
    };

    useEffect(() => {
        //to get pervious state
        let { id: projectId } = props.route.params;

        props.getProjectState(projectId);
        // props.getProjects(id);
    }, []);

    useEffect(() => {
        const backAction = () => {
            props.updateVisibilityItems('childrenElements', []);
            props.updateVisibilityItems('elementsToGenerate', []);
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        //checking if the element is trashable or not
        //ie. if the element is dragged to the delete icon
        //then it is trashable
        //otherwise its not trashable
        if (isEelmentTrashable) {
            let newChildrenElements = childrenElements.slice();
            //finding the index of trashable element
            let deleteIndex = newChildrenElements.findIndex(child => child.props.id === isDraggingIndex);
            if (deleteIndex !== -1) {
                let current = newChildrenElements[deleteIndex].props.id === props.showOptions.id ? true : false
                props.setShowOptions({
                    ...props.showOptions,
                    isVisible: current ? false : props.showOptions.isVisible,
                    selectedOption: current ? '' : props.showOptions.selectedOption,
                    id: current ? null : props.showOptions.id
                })
                //remove the trashable element
                newChildrenElements.splice(deleteIndex, 1);
                //re rendering the elements 
                setChildrenElements(newChildrenElements);

            }
        }
    }, [isDraggingIndex, isEelmentTrashable]);

    useEffect(() => {
        //to scale the delete view
        //to give the effect to user
        //that the element you are dragging
        //is going to delete
        if (zoomDeleteIcon) scaleDeleteView();
        else normalDeleteView();
    }, [zoomDeleteIcon]);
    useEffect(() => {
        if (props.tempState.childrenElements) {
            setChildrenElements(props.tempState.childrenElements)
        }
    }, [props.tempState])

    useEffect(() => {
        //to show hide the delete button
        //if the elment is dragging then
        //show the delete button
        //otherwise hide the delete button
        if (isDragging) showDeleteView();
        else hideDeleteView();
    }, [isDragging]);
    //adding event listner so that on orientation change can be listened
    useEffect(() => {
        //adding event listner
        Dimensions.addEventListener('change', changeCurrentDimensions);
        return () => {
            //remove event listner 
            //clean up
            Dimensions.removeEventListener('change', changeCurrentDimensions);
        };
    }, []);

    useEffect(() => {
        regenerateStuff();
    }, [props.elementsToGenerate])

    //open saved project
    async function regenerateStuff() {
        let { elementsToGenerate } = props;
        if (childrenElements.length === 0) {
            let thingsToRender = [];
            for (const element of elementsToGenerate) {

                //element that is to regenerate
                let { id } = element.props;
                if (id.includes('defaultRoom')) {
                    let roomType = id.replace('defaultRoom', '');
                    roomType = roomType.match(/[a-zA-Z]+/g);
                    thingsToRender.push(generateDefaultRoom(roomType[0], true, id));
                }
                else if (id.includes('roomAddition')) {
                    console.log(id, " Room addition item");
                    let roomAdditionType = id.replace('roomAddition', '');
                    roomAdditionType = roomAdditionType.replace('item', '');
                    roomAdditionType = roomAdditionType.match(/[a-zA-Z]+/g);
                    roomAdditionType = roomAdditionType[0];
                    // reGenerateAddition(roomAdditionType, generateRoomAddition, null, null);
                }
                else if (id.includes('item')) {
                    let itemType = id.replace('item', '');
                    itemType = itemType.match(/[a-zA-Z]+/g);
                    itemType = itemType[0];
                    let allItems = ['doors', 'windows', 'plumbing', 'airConditioning', 'carpentry', 'electrical', 'fireServices', 'glazing', 'misc', 'tileTool'];
                    let result = allItems.filter(item => itemType.includes(item));
                    let includedItem = result[0] ? result[0] : '';
                    itemType = itemType.replace(includedItem, '');
                    let itemToGenerate = Items[includedItem].filter(e => e.id === itemType);
                    itemToGenerate = itemToGenerate[0];
                    let itemToRender = await generateItem(getItem(itemToGenerate.image), itemToGenerate.name, itemToGenerate.image, includedItem, itemToGenerate.id, true);
                    thingsToRender.push(itemToRender[0]);
                }
            }
            setChildrenElements(thingsToRender);
        }
    }
    // get item
    function getItem(image) {
        return (
            <Image
                source={image}
                style={{ height: 50, width: 50 }}
                resizeMode="contain"
            />
        )
    }

    //changing the dimensions on orientation change
    function changeCurrentDimensions() {
        setCurrentDimensions({
            ...currentDimensions,
            WIDTH: Dimensions.get('window').width,  //current width updated
            HEIGHT: Dimensions.get('window').height //current height updated
        });
    }

    return (
        <View style={[styles.container]}>
            
            <PinchZoomView
                style={styles.artboard}
                scalable={artboardDraggable}    //artboard pinning flag
                onScaleRelease={(scale) => {
                    setLastScale(scale)
                }}
            >
                <View style={StyleSheet.absoluteFill}>
                    <View
                        style={[styles.artboard, {

                        }
                        ]}
                    >
                        <View style={styles.artboard}>
                            {/* below is the array of chilren 
elements rendering in the artobard */}
                            <Image
                                //grid is stored in local assets
                                source={require('../../assets/grid10.png')}
                                style={[
                                    styles.freeDrawContainer,
                                    {
                                        backgroundColor: '#fff',
                                        height: '200%',
                                        width: '200%',
                                    }
                                ]}
                            />
                            <ViewShot
                                ref={viewShotRef}
                                options={{
                                    format: "jpg",
                                    quality: 0.9,
                                    // width: currentDimensions.WIDTH + (0.4 * currentDimensions.WIDTH),
                                    // height: currentDimensions.HEIGHT + (0.4 * currentDimensions.HEIGHT), 
                                    result: "data-uri",
                                }}
                                style={[styles.artboard, {
                                    // height: currentDimensions.HEIGHT - 230,
                                    // width: '100%',
                                    // height: '100%',
                                    // bottom: 150,
                                    backgroundColor: Platform.OS === 'ios' ? ('transparent') : (isGeneratingPDF ? '#fff' : ('transparent'))
                                }]}
                            >
                                <SprayDraw
                                    isEraser={isEraser}
                                    eraserStroke={eraserStroke}
                                    isFreeDraw={isFreeDraw}
                                    freeDrawColor={freeDrawColor}
                                    freeDrawStroke={freeDrawStroke}
                                    isSprayDraw={isSprayDraw}
                                    sprayDrawColor={sprayDrawColor}
                                    sprayDrawStroke={sprayDrawStroke}
                                    sprayDrawDensity={sprayDrawDensity}
                                    toggleDimensions={toggleDimensions}
                                    canvasRef={canvasRef}
                                />
                                {childrenElements}
                            </ViewShot>
                            {props.snapGridX.map((pos, key) => {
                                if (pos !== false)
                                    return (
                                        <View key={key} style={{position:'absolute', backgroundColor:'blue', left: Dimensions.get('window').width / 2 + pos, width:1, height:1000}}/>
                                    )
                            })}
                            {props.snapGridY.map((pos, key) => {
                                if (pos !== false)
                                    return (
                                        <View key={key} style={{position:'absolute', backgroundColor:'blue', top: Dimensions.get('window').height / 2 + pos - (Platform.OS === 'ios' ? 0 : 15), width:1000, height:1}}/>
                                    )
                            })}
                        </View>
                    </View>
                </View>
            </PinchZoomView>
            <OptionsBar
                styles={styles}
                setRoomAddition={setRoomAddition}
                setDimensionsVisible={setDimensionsVisible}
            />

            <Animated.View
                style={[styles.trashIconContainer,
                {
                    opacity: deleteViewOpacity,
                    transform: [
                        {
                            scale: deleteViewScale
                        }
                    ]
                }
                ]}
            >
                <View style={styles.deleteButtonContainer}>
                    <FontAwesome
                        name="trash-o"
                        color={Colors.danger}
                        size={20}
                        style={styles.trashIcon}
                    />
                </View>
            </Animated.View>

            {/* top bar */}
            <View style={styles.topBar}>
                {/* temporary back icon placed here */}
                <IconButton
                    icon="arrow-left"
                    onPress={backScreen}
                />
                <IconButton
                    icon="plus"
                    onPress={() => { setAddModalVisible(true) }}
                />
                <IconButton
                    icon="save"
                    inverse={true}
                    onPress={saveProjectNow}
                />
                <IconButton
                    icon="gear"
                    onPress={() => { setSettingsModalVisible(true) }}
                    inverse={true}
                />
            </View>

            {/* toolbar */}
            <Toolbar
                canvasRef={canvasRef}
                toolBarTranslate={toolBarTranslate} //animation value
                generateMoisture={generateMoisture}
                generateArrow={generateArrow}   //arrow generation
                generateCurvedArrow={generateCurvedArrow}   //curved arrow generation
                generateEraser={generateEraser} //generate eraser
                generateFreeDraw={generateFreeDraw} //generate free draw
                generateSprayDraw={generateSprayDraw} //generate spray tool
                generateHighlight={generateHighlight} //generate highlighter
                generateText={generateText} //generate text
                setFreeDrawStroke={setFreeDrawStroke}   //set current free draw stroke size
                setFreeDrawColor={setFreeDrawColor} //set current free draw stroke color
                setSprayDrawStroke={setSprayDrawStroke}   //set current free draw stroke size
                setSprayDrawColor={setSprayDrawColor} //set current free draw stroke color
                setSprayDrawDensity={setSprayDrawDensity}
                setEraserStroke={setEraserStroke}   //set current eraser stroke
                generatePhotoref={generatePhotoref}
            />
            {/* tool bar ended */}

            <TexturesBar />
            <CeilingsBar />
            <MaterialsBar />

            <DimensionsModal
                modalVisible={dimensionsVisible}
                setModalVisible={setDimensionsVisible}
            />

            <ItemsToolbar
                itemsToolbarTranslate={itemsToolbarTranslate}   //animated value
                generateItem={generateItem}
            />

            {/* bottom options bar */}
            <BottomOptionsBar
                styles={styles}
                isToolbarOpen={isToolbarOpen}
                isItemsToolbarOpen={isItemsToolbarOpen}
                bottomBarTranslate={bottomBarTranslate}
                closeToolBar={closeToolBar}
                openToolBar={openToolBar}
                closeItemsToolbar={closeItemsToolbar}
                openItemsToolbar={openItemsToolbar}
            />
            {/* bottom options bar ended */}

            {/* bottom bar component */}
            <BottomBar
                captureView={captureView}
                isGeneratingPDF={isGeneratingPDF}
                setArtboardDraggable={setArtboardDraggable}
                artboardDraggable={artboardDraggable}
            />

            {/* modals */}
            <SettingsModal
                modalVisible={settingsModalVisible}
                setModalVisible={setSettingsModalVisible}
            />
            <AskRoomDetailOrDefault
                modalVisible={askRoomDefaultVisible}
                roomType={roomType}
                setModalVisible={setAskRoomDefaultVisible}
                setRoomDetailsVisible={setRoomDetailsVisible}
                generateDefaultRoom={generateDefaultRoom}
            />
            <AddRoomAddition
                modalVisible={roomAddition}
                setModalVisible={setRoomAddition}
                setRoomType={setRoomType}
                generateRoomAddition={generateRoomAddition}
            />
            <AddModal
                generateDefaultRoom={generateDefaultRoom}
                modalVisible={addModalVisible}
                setRoomType={setRoomType}
                setModalVisible={setAddModalVisible}
                setRoomDetailsVisible={setRoomDetailsVisible}
                setAskRoomDefaultVisible={setAskRoomDefaultVisible}
            />
            <RoomDetailsModal
                modalVisible={roomDetailsVisible}
                roomType={roomType}
                setModalVisible={setRoomDetailsVisible}
                generateRoom={generateRoom}
            />
            <SnapGridLine />
            <CanvasLoader />
        </View>
    )


    // ==============================  functions =============================== //

    // ========================  element generation functions ================= //
    //generating elements
    //arrow generation
    async function generateRoomAddition(roomElement, id, properties, isMultiple) {
        let element = await import('./Elements/CommonElementGenerator');
        let itemToGenerate = await pushNewElment(element, `itemroomAddition${id}`, properties, roomElement, isMultiple);
        if (isMultiple) return itemToGenerate;
    }

    //generating highlighter
    async function generateHighlight(color) {
        let element = await import('./Elements/Highlighter');
        let itemToGenerate = await pushNewElment(element, 'highliter', { color: color ? color : null, isGeneratingPDF: isGeneratingPDF });
    }
    function generateArrow() {
        import('./Elements/StraightArrow').then((element) => {  //dynamic element import
            pushNewElment(element, 'arrow'); //=> push new element
        });
        removeFreeDraw();
        removeSprayDraw();
    }
    //text generation
    function generateText() {
        import('./Elements/TextElem').then((element) => { //dynamic element import
            pushNewElment(element, 'text'); //=> push new element
        });
        removeFreeDraw();
        removeSprayDraw();
    }
    //curved arrow generation
    function generateCurvedArrow() {
        import('./Elements/CurvedArrow').then((element) => { //dynamic element import
            pushNewElment(element, 'curvedArrow'); //=> push new element
        });
        removeFreeDraw();
        removeSprayDraw();
    }
    //room generation
    function generateRoom(childProps) {
        import('./Elements/RoomElement').then((element) => {
            pushNewElment(element, 'room', childProps);
        })
    }

    //generating photo reference
    async function generatePhotoref() {
        let element = await import('./Elements/MoistureReading');
        let itemToGenerate = pushNewElment(element, 'photoRef', {
            photoRef: true  //prop for the component
        })
    }

    //generating moisture drop
    function generateMoisture() {
        //import moisture element
        //push that element
        import('./Elements/MoistureReading').then((element) => {
            pushNewElment(element, 'moistureRef')
        })
    }

    //item generation
    async function generateItem(children, itemName, itemImage, type, itemId, isMultiple) {
        let uId = `item${type}${itemId}`;
        let uIdToSet = `${uId}${childrenElements.length}`
        let itemToReturn;

        if (type === 'doors' || type === 'windows') {
            let { itemBelongsTo, setItemBelongsTo } = props;
            setItemBelongsTo({
                ...itemBelongsTo,
                [uIdToSet]: {
                    ...itemBelongsTo[uId],
                    room: props.showOptions.id,
                    wall: ''
                }
            });
        }

        let element = await import('./Elements/ItemElement');
        itemToReturn = await pushNewElment(element, uId, { itemName: itemName, itemImage: itemImage }, children, isMultiple);
        if (isMultiple) return itemToReturn;

        // import('./Elements/ItemElement').then((element) => {
        //     itemToReturn = pushNewElment(element, uId, { itemName: itemName, itemImage: itemImage }, children, isMultiple)
        //     if(isMultiple) return itemToReturn;
        // })
    }


    function generateDefaultRoom(roomType, isMultiple, id, location) {
        let newChildrenElements = [...childrenElements];

        
        newChildrenElements.push(
            <View
                key={isMultiple ? id : `${'defaultRoom'}${roomType}${newChildrenElements.length}`}    //key -> array of elements to render
                id={isMultiple ? id : `${'defaultRoom'}${roomType}${newChildrenElements.length}`}     //id  -> to delete the element 
                style={{ position: 'absolute' }}    //any element doesn't interfere with any other
            //even while deleting adding moving
            >
                <DefaultRoom
                    roomType={roomType}
                    id={isMultiple ? id : `${'defaultRoom'}${roomType}${newChildrenElements.length}`}     //id  -> to delete the element 
                    location={location ? location : {x: 0, y: 0}}
                    setIsDragging={setIsDragging}                   //setIsDragging -> to make the delete button visible
                    setIsDraggingIndex={setIsDraggingIndex}         //setIsDraggingIndex -> current dragging element Index
                    setIsElementTrashable={setIsElementTrashable}   //setIsElementTrashable -> is dragged moved to trash
                    setZoomDeleteIcon={setZoomDeleteIcon}           //setZoomDeleteIcon -> scale the view of trash so that 
                />
            </View>
        );
        if (isMultiple) {
            return newChildrenElements[0]
        }
        setChildrenElements(newChildrenElements);
    }

    function generateEraser() {
        closeToolBar();
        setIsEraser(true);
        setIsFreeDraw(false);
        setIsSprayDraw(false);
    }
    //generating free draw
    function generateFreeDraw() {
        setIsFreeDraw(true);
        removeSprayDraw();
        closeToolBar();
    }
    function removeFreeDraw() {
        setIsFreeDraw(false);
        setIsEraser(false);
    }
    function generateSprayDraw() {
        setIsSprayDraw(true);
        removeFreeDraw();
        closeToolBar();
    }
    function removeSprayDraw() {
        setIsSprayDraw(false);
        setIsEraser(false);
    }

    /*
        * Push New Element
        *
        * Pushing generated element to artboard
        *
        * @param {node} element -> generated element
        * @param {string} type -> type of element
        * @param {object} childProps -> Props that should be passed to the element
        * @param {childNode} children -> Any other children to render 
        * @param {isMultiple} isMultiple -> 
        * Flag so that multiple elements can be returned in case of regeneration
    */
    function pushNewElment(element, type, childProps, children, isMultiple) {
        let newChildrenElements;
        if (isMultiple) {
            newChildrenElements = [];
        }
        else {
            newChildrenElements = [...childrenElements];
        }
        newChildrenElements.push(
            <View
                key={`${type}${newChildrenElements.length}`}    //key -> array of elements to render
                id={`${type}${newChildrenElements.length}`}     //id  -> to delete the element 
                style={{ position: 'absolute' }}    //any element doesn't interfere with any other
                //even while deleting adding moving
                {...childProps}
            >
                <element.default
                    {...childProps}
                    key={`${type}${newChildrenElements.length}`}    //key -> array of elements to render
                    id={`${type}${newChildrenElements.length}`}     //id  -> to delete the element 
                    setIsDragging={setIsDragging}                   //setIsDragging -> to make the delete button visible
                    setIsDraggingIndex={setIsDraggingIndex}         //setIsDraggingIndex -> current dragging element Index
                    setIsElementTrashable={setIsElementTrashable}   //setIsElementTrashable -> is dragged moved to trash
                    setZoomDeleteIcon={setZoomDeleteIcon}           //setZoomDeleteIcon -> scale the view of trash so that 
                //user can have a feel that items is going to be deleted
                >
                    {children ? children : null}
                </element.default>
            </View>
        );
        if (isMultiple) {
            return newChildrenElements
        }
        else {
            setChildrenElements(newChildrenElements);
        }
        closeBothToolBars();
    }

    // ==============================  Animation functions =============================== //
    function closeBothToolBars() {
        setIsToolbarOpen(false);
        setIsItemsToolbarOpen(false);
        Animated.parallel([
            //bottom bar animation
            Animated.spring(bottomBarTranslate, {
                //changing the translate value to 80
                toValue: 80,
                useNativeDriver: true,
                friction: 10
            }),
            //toolbar animation
            Animated.spring(toolBarTranslate, {
                // changing the translate value to 1500
                toValue: 1500,
                useNativeDriver: true,
                friction: 10
            }),

            //toolbar animation
            Animated.spring(itemsToolbarTranslate, {
                // changing the translate value to 1500
                toValue: 500,
                useNativeDriver: true,
                friction: 10
            })
        ]).start();
    }
    //open tool bar
    async function openToolBar() {
        //setting the state isToolBarOpen
        //to know the current status of the toolbar
        //either toolbar is opened or closed
        setIsToolbarOpen(true);
        closeItemsToolbar(() => {
            Animated.parallel([

                //bottom bar animation
                Animated.spring(bottomBarTranslate, {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 10
                }),
                //toolbar animation
                Animated.spring(toolBarTranslate, {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 6
                })
            ]).start();
        });

    }

    //close tool
    function closeToolBar(callback) {
        //setting the state isToolBarOpen
        //to know the current status of the toolbar
        //either toolbar is opened or closed
        setIsToolbarOpen(false);
        Animated.parallel([
            //bottom bar animation
            Animated.spring(bottomBarTranslate, {
                //changing the translate value to 80
                toValue: 80,
                useNativeDriver: true,
                friction: 10
            }),
            //toolbar animation
            Animated.spring(toolBarTranslate, {
                // changing the translate value to 1500
                toValue: 1500,
                useNativeDriver: true,
                friction: 10
            })
        ]).start(() => { if (callback) callback() });
    }

    //show trash view if item is being dragged
    function showDeleteView() {
        //changing the opacity of the parent view
        //to value 1
        Animated.spring(deleteViewOpacity, {
            toValue: 1,
            useNativeDriver: true,
            friction: 20
        }).start();
    }
    //hide trash view if item is stopped dragging
    function hideDeleteView() {
        //changing the opacity of the parent view
        //to value 0
        Animated.spring(deleteViewOpacity, {
            toValue: 0,
            useNativeDriver: true,
            friction: 20
        }).start();
    }

    //scale the trash view
    function scaleDeleteView() {
        Animated.spring(deleteViewScale, {
            toValue: 1.2,
            useNativeDriver: true,
            friction: 20
        }).start();
    }

    //normal the trash view
    function normalDeleteView() {
        Animated.spring(deleteViewScale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 20
        }).start();
    }

    //goback function
    function backScreen() {
        let { navigation } = props;
        props.updateVisibilityItems('childrenElements', []);
        props.updateVisibilityItems('elementsToGenerate', []);
        navigation.goBack();
    }


    //open tool bar
    function openItemsToolbar() {
        //setting the state isToolBarOpen
        //to know the current status of the toolbar
        //either toolbar is opened or closed
        setIsItemsToolbarOpen(true);
        closeToolBar(() => {
            Animated.parallel([

                //bottom bar animation
                Animated.spring(bottomBarTranslate, {
                    toValue: -80,
                    useNativeDriver: true,
                    friction: 10
                }),
                //toolbar animation
                Animated.spring(itemsToolbarTranslate, {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 10
                })
            ]).start();
        });

    }

    //close tool
    function closeItemsToolbar(callback) {
        //setting the state isToolBarOpen
        //to know the current status of the toolbar
        //either toolbar is opened or closed
        setIsItemsToolbarOpen(false);
        Animated.parallel([
            //bottom bar animation
            Animated.spring(bottomBarTranslate, {
                //changing the translate value to 80
                toValue: 80,
                useNativeDriver: true,
                friction: 10
            }),
            //toolbar animation
            Animated.spring(itemsToolbarTranslate, {
                // changing the translate value to 1500
                toValue: 500,
                useNativeDriver: true,
                friction: 10
            })
        ]).start(() => { if (callback) callback() });
    }

    function getPhotoRefImage(source) {
        return (
            <Image
                source={source}
                style={{ height: '100%', width: '100%' }}
                resizeMode="contain"
            />
        )
    }

    //capturing artboard
    function captureView() {
        setIsGeneratingPDF(true);
        viewShotRef.current.capture().then(uri => {
            // downloadPDF(uri);
            createPDF(uri)
        });
    }

    function createPDF(uri) {
        let options = {
            html: HtmlPdf(
                uri,
                childrenElements,
                props.labels,
                props.notes,
                props.dimensions,
                props.itemMaterialTypes,
                props.itemBelongsTo,
                props.originalDimensions,
                props.ceilingType,
                props.cathedralCeilingHeights,
                props.ceilingHeight,
                props.customLogo
            ),
            fileName: `CalcITFloorPlan${Date.now()}`,
            directory: 'Documents',
            base64: Platform.OS === 'ios' ? true : false
        };
        RNHTMLtoPDF.convert(options).then((file) => {
            setToggleDimensions(previousState => !previousState);
            Alert.alert(
                "Your pdf is ready!!",
                Platform.OS === 'android' ? (`CalcIT Floor plan is stored in Documents folder!! Path is ${file.filePath}`) : (`Your PDF is Created Succesfully, Please click on Save button to save it on custom location.`),
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: Platform.OS === 'android' ? 'Open' : 'Save', onPress: () => {
                            if (Platform.OS === 'ios') downloadPDF(`data:application/pdf;base64,${file.base64}`, file.filePath);
                            else {
                                // console.log(file.filePath)
                                const android = RNFetchBlob.android;
                                android.actionViewIntent(file.filePath, 'application/pdf');
                            }
                        }
                    }
                ],
                { cancelable: true }
            );
        })
            .catch((error) => {
                console.log(error, "error occured")
            })
            .finally(() => {
                setIsGeneratingPDF(false);
            })
    }
    async function downloadPDF(uri, path) {
        let optionsShare = {
            message: 'Your pdf is Ready!!',
            title: 'CalcIT Floor Planner',
            saveToFiles: true,
            url: uri
        }
        Share.open(optionsShare)
            .then((res) => {
                Alert.alert(
                    "PDF",
                    "Do You Want to Open PDF?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: 'Open', onPress: () => {
                                RNFetchBlob.ios.openDocument(path).then((response) => {
                                }).catch((error) => {
                                    console.log(error)
                                })
                            }
                        }
                    ],
                    { cancelable: true }
                );
            })
            .catch((err) => { err && console.log(err, "error occured"); });
    }

    function saveProjectNow() {
        let { id: projectId } = props.route.params;
        let stateToSave = {
            childrenElements: props.childrenElements,
            textures: props.textures,
            positions: props.positions,
            notes: props.notes,
            labels: props.labels,
            showOptions: props.showOptions,
            artboardDraggable: props.artboardDraggable,
            flips: props.flips,
            itemMaterialTypes: props.itemMaterialTypes,
            itemBelongsTo: props.itemBelongsTo,
            originalDimensions: props.originalDimensions,
            ceilingType: props.ceilingType,
            ceilingHeight: props.ceilingHeight,
            snapGridX: props.snapGridX,
            snapGridY: props.snapGridY,
            cathedralCeilingHeights: props.cathedralCeilingHeights,
            dimensions: props.dimensions,
            currentDimensions: props.originalDimensions
        }
        props.saveProject(
            projectId,
            stateToSave
        );
    }
}

const mapStateToProps = () => state => ({
    //options states
    showOptions: state.Options.showOptions,
    labels: state.Options.labels,
    notes: state.Options.notes,
    tempState: state.Project.tempState,
    artboardDraggable: state.Options.artboardDraggable,
    childrenElements: state.Options.childrenElements,
    lastScale: state.Options.lastScale,
    flips: state.Options.flips,
    dimensions: state.Options.dimensions,
    itemMaterialTypes: state.Options.itemMaterialTypes,
    itemBelongsTo: state.Options.itemBelongsTo,
    originalDimensions: state.Options.currentDimensions,
    ceilingType: state.Options.ceilingType,
    ceilingHeight: state.Options.ceilingHeight,
    cathedralCeilingHeights: state.Options.cathedralCeilingHeights,
    elementsToGenerate: state.Options.elementsToGenerate,
    textures: state.Options.textures,
    positions: state.Options.positions,
    snapGridX: state.Options.snapGridX,
    snapGridY: state.Options.snapGridY,
    //project states
    customLogo: state.Project.customLogo,
    isGeneratingPDF: state.Project.isGeneratingPDF
});

const mapDispatchToProps = () => dispatch => ({
    setShowOptions: (options) => dispatch(setShowOptions(options)),

    //saving project state
    saveProject: (projectId, state) => dispatch(saveProject(projectId, state)),
    //getting project state
    getProjectState: (projectId) => dispatch(getProjectState(projectId)),

    setArtboardDraggable: (flag) => dispatch(setArtboardDraggable(flag)),
    deleteOptions: (id) => dispatch(deleteOptions(id)),
    setChildrenElements: (elements) => dispatch(setChildrenElements(elements)),
    setLastScale: (lastScale) => dispatch(setLastScale(lastScale)),
    setItemBelongsTo: (payload) => dispatch(setItemBelongsTo(payload)),
    updateVisibilityItems: (stateName, value) => dispatch(updateVisibilityItems(stateName, value)),

    //pdf loader toggle
    setIsGeneratingPDF: (currentLoadingState) => dispatch(togglePdfLoader(currentLoadingState))
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);