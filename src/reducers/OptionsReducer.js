import React, { createElement } from 'react';
import {
    SET_ARTBOARD_DRAGGABLE,
    SET_LABELS,
    SET_NOTES,
    SET_SHOW_OPTIONS,
    SET_CEILING_HEIGHTS,
    SET_TEXTURES,
    DELETE_ROOM_OPTIONS,
    TOGGLE_CARPENTRY_VISIBLE,
    TOGGLE_ELECTRICAL_VISIBLE,
    TOGGLE_PLUMBING_VISIBLE,
    SET_CHILDREN_ELEMENTS,
    SET_POSITIONS,
    SET_LAST_SCALE,
    SET_CEILING_TYPE,
    TOGGLE_BOTTOM_VISIBLITY_FLAGS,
    SET_FLIP_ITEM,
    SET_DIMENSIONS,
    SET_CATHEDRAL_CEILING_HEIGHT,
    SET_TILE_TOOL,
    SET_ITEM_MATERIAL,
    SET_ITEMS_BELONGS_TO,
    SET_CURRENT_DIMENSIONS,
    GET_PROJECT_STATE,
    SET_SNAP_GRID_X,
    SET_SNAP_GRID_Y,
    RESET_SNAP_GRID_XY,
    UPDATE_OPTION
} from '../actions/types';

const initialState = {

    childrenElements: [],

    //current options
    showOptions: {
        isVisible: false,
        id: null,
        selectedOption: '',
        labels: []   //{currentLabel: 'Hide', id: ''}
    },

    //rooms and item features
    notes: {},
    labels: {},
    ceilingHeight: {},
    textures: {},
    positions: {},
    ceilingType: {},
    flips: {},
    dimensions: {}, //height, width
    cathedralCeilingHeights: {},
    tileTool: {},   //wallTile, splashBackTile
    itemMaterialTypes: {}, //id: materialType
    itemBelongsTo: {},
    currentDimensions: {},
    moistureReadings: {},
    photorefReadings: {},
    snapGridX: [],
    snapGridY: [],
    //bottom bar flat for pinning/unpinning artboard
    artboardDraggable: false,
    //bottom bar options
    isCarpentryVisible: true,
    isPlumbingVisible: true,
    isElectricalVisible: true,
    isDoorsVisible: true,
    isWindowsVisible: true,
    isAirConditioningVisible: true,
    isFireServicesVisible: true,
    isGlazingVisible: true,
    isMiscVisible: true,
    //last scale
    lastScale: 1,

    //elements to generate
    elementsToGenerate: []

}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_OPTIONS:
            return {
                ...state,
                showOptions: {
                    ...state.showOptions,
                    ...action.payload
                }
            }
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        case SET_LABELS:
            return {
                ...state,
                labels: action.payload
            }
        case SET_ARTBOARD_DRAGGABLE:
            return {
                ...state,
                artboardDraggable: action.payload
            }
        case SET_CEILING_HEIGHTS:
            return {
                ...state,
                ceilingHeight: action.payload
            }
        case SET_TEXTURES:
            return {
                ...state,
                textures: action.payload
            }
        case DELETE_ROOM_OPTIONS:

            let newNotes = { ...state.notes };
            let newLabels = { ...state.labels };
            let newCeilingHeight = { ...state.ceilingHeight };
            let newTextures = { ...state.textures };
            let newPositions = { ...state.positions };
            let newCeilingType = { ...state.ceilingType };
            let newFlips = { ...state.flips };
            let newDimensions = { ...state.dimensions };
            let newCathedralCeilingHeights = { ...state.cathedralCeilingHeights };
            let newTileTool = { ...state.tileTool };
            let newItemMaterialTypes = { ...state.itemMaterialTypes };
            let newItemBelongsTo = { ...state.itemBelongsTo };
            let newCurrentDimensions = { ...state.currentDimensions };

            delete newNotes[action.payload];
            delete newLabels[action.payload];
            delete newCeilingHeight[action.payload];
            delete newTextures[action.payload];
            delete newPositions[action.payload];
            delete newCeilingType[action.payload];
            delete newFlips[action.payload];
            delete newDimensions[action.payload];
            delete newCathedralCeilingHeights[action.payload]
            delete newTileTool[action.payload];
            delete newItemMaterialTypes[action.payload];
            delete newItemBelongsTo[action.payload];
            delete newCurrentDimensions[action.payload];

            return {
                ...state,
                notes: newNotes,
                labels: newLabels,
                ceilingHeight: newCeilingHeight,
                textures: newTextures,
                positions: newPositions,
                ceilingType: newCeilingType,
                flips: newFlips,
                dimensions: newDimensions,
                cathedralCeilingHeights: newCathedralCeilingHeights,
                tileTool: newTileTool,
                itemMaterialTypes: newItemMaterialTypes,
                itemBelongsTo: newItemBelongsTo,
                currentDimensions: newCurrentDimensions
            }

        case TOGGLE_CARPENTRY_VISIBLE:
            return {
                ...state,
                isCarpentryVisible: action.payload
            }

        case TOGGLE_ELECTRICAL_VISIBLE:
            return {
                ...state,
                isElectricalVisible: action.payload
            }
        case TOGGLE_PLUMBING_VISIBLE:
            return {
                ...state,
                isPlumbingVisible: action.payload
            }
        case SET_CHILDREN_ELEMENTS:
            return {
                ...state,
                childrenElements: [
                    ...action.payload
                ]
            }
        case SET_POSITIONS:
            return {
                ...state,
                positions: action.payload
            }
        case SET_LAST_SCALE:
            return {
                ...state,
                lastScale: action.payload
            }
        case SET_CEILING_TYPE:
            return {
                ...state,
                ceilingType: action.payload
            }
        case TOGGLE_BOTTOM_VISIBLITY_FLAGS:
            return {
                ...state,
                [action.name]: action.payload
            }
        case SET_FLIP_ITEM:
            return {
                ...state,
                flips: action.payload
            }
        case SET_DIMENSIONS:
            return {
                ...state,
                dimensions: action.payload
            }
        case SET_CATHEDRAL_CEILING_HEIGHT:
            return {
                ...state,
                cathedralCeilingHeights: action.payload
            }
        case SET_TILE_TOOL:
            return {
                ...state,
                tileTool: action.payload
            }
        case SET_ITEM_MATERIAL:
            return {
                ...state,
                itemMaterialTypes: action.payload
            }
        case SET_ITEMS_BELONGS_TO:
            return {
                ...state,
                itemBelongsTo: action.payload
            }
        case SET_CURRENT_DIMENSIONS:
            return {
                ...state,
                currentDimensions: action.payload
            }
        case SET_SNAP_GRID_X:           //Own Code
            return {
                ...state,
                snapGridX: action.payload.pos
            }
        case SET_SNAP_GRID_Y:           //Own Code
            return {
                ...state,
                snapGridY: action.payload.pos
            }
        case RESET_SNAP_GRID_XY:
            return {
                ...state,
                snapGridX: [],
                snapGridY: []
            }
        case GET_PROJECT_STATE:
            let parsedState = action.payload ? JSON.parse(action?.payload?.projectStates) : {
                childrenElements: [],
                artboardDraggable: false
                // showOptions: {
                //     labels: []
                // }
            };
            let childrenElements = [...parsedState.childrenElements];
            let textures = { ...parsedState.textures }
            let positions = { ...parsedState.positions }
            let notes = { ...parsedState.notes }
            let labels = { ...parsedState.labels }
            // let showOptions = { ...parsedState.showOptions }
            let artboardDraggable = parsedState.artboardDraggable
            let flips = { ...parsedState.flips }
            let itemMaterialTypes = { ...parsedState.itemMaterialTypes }
            let itemBelongsTo = { ...parsedState.itemBelongsTo }
            let originalDimensions = { ...parsedState.originalDimensions }
            let ceilingType = { ...parsedState.ceilingType }
            let ceilingHeight = { ...parsedState.ceilingHeight }
            let cathedralCeilingHeights = { ...parsedState.cathedralCeilingHeights }
            let dimensions = { ...parsedState.dimensions }
            let currentDimensions = { ...parsedState.currentDimensions }

            return {
                ...state,
                textures,
                positions,
                notes,
                labels,
                // showOptions,
                artboardDraggable,
                flips,
                itemMaterialTypes,
                itemBelongsTo,
                originalDimensions,
                ceilingType,
                ceilingHeight,
                cathedralCeilingHeights,
                dimensions,
                currentDimensions,
                elementsToGenerate: childrenElements,
            }
        //this type can only be used in case of options that are objects
        //due to spread operator used
        case UPDATE_OPTION:
            return {
                ...state,
                [action.name]: {
                    ...action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}