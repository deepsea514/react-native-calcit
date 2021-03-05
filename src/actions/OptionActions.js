import {
    DELETE_ROOM_OPTIONS,
    SET_ARTBOARD_DRAGGABLE,
    SET_CEILING_HEIGHTS,
    SET_LABELS,
    SET_NOTES,
    SET_SHOW_OPTIONS,
    SET_TEXTURES,
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
    SET_SNAP_GRID_X,            //Own Code
    SET_SNAP_GRID_Y,            //Own Code
    RESET_SNAP_GRID_XY,
    UPDATE_OPTION
} from './types';

export const setShowOptions = (options) => ({
    type: SET_SHOW_OPTIONS,
    payload: options
})

export const setNotes = (notes) => ({
    type: SET_NOTES,
    payload: notes
})

export const setLabels = (labels) => ({
    type: SET_LABELS,
    payload: labels
})

export const setArtboardDraggable = (flag) => ({
    type: SET_ARTBOARD_DRAGGABLE,
    payload: flag
})

export const setCeilingHeights = (height) => ({
    type: SET_CEILING_HEIGHTS,
    payload: height
})

export const setTextures = (textures) => ({
    type: SET_TEXTURES,
    payload: textures
})

export const deleteOptions = (roomId) => ({
    type: DELETE_ROOM_OPTIONS,
    payload: roomId
})

export const toggleCarpentryVisible = (visibility) => ({
    type: TOGGLE_CARPENTRY_VISIBLE,
    payload: visibility
})

export const togglePlumbingVisible = (visibility) => ({
    type: TOGGLE_PLUMBING_VISIBLE,
    payload: visibility
})

export const toggleElectricalVisible = (visibility) => ({
    type: TOGGLE_ELECTRICAL_VISIBLE,
    payload: visibility
})

export const setChildrenElements = (children) => ({
    type: SET_CHILDREN_ELEMENTS,
    payload: children
})

export const setPosition = (position) => ({
    type: SET_POSITIONS,
    payload: position
})

export const setLastScale = (lastScale) => ({
    type: SET_LAST_SCALE,
    payload: lastScale
})

export const setCeilingType = (ceiling) => ({
    type: SET_CEILING_TYPE,
    payload: ceiling
})

export const updateVisibilityItems = (name, value) => ({
    type: TOGGLE_BOTTOM_VISIBLITY_FLAGS,
    name,
    payload: value
})

export const setFlips = (flips) => ({
    type: SET_FLIP_ITEM,
    payload: flips
})

export const setDimensions = (dimensions) => ({
    type: SET_DIMENSIONS,
    payload: dimensions
})

export const setCathedralCeilingHeight = (heights) => ({
    type: SET_CATHEDRAL_CEILING_HEIGHT,
    payload: heights
})

export const setTileTool = (tileTool) => ({
    type: SET_TILE_TOOL,
    payload: tileTool
})

export const setMaterialType = (type) => ({
    type: SET_ITEM_MATERIAL,
    payload: type
})

export const setItemBelongsTo = (payload) => ({
    type: SET_ITEMS_BELONGS_TO,
    payload
})

export const setCurrentDimensions = (currentDimensions) => ({
    type: SET_CURRENT_DIMENSIONS,
    payload: currentDimensions
})
//Own Code
export const setSnapGridX = (snapState) => ({
    type: SET_SNAP_GRID_X,
    payload: snapState
})
//Own Code
export const setSnapGridY = (snapState) => ({
    type: SET_SNAP_GRID_Y,
    payload: snapState
})
export const resetSnapGridXY = () => ({
    type: RESET_SNAP_GRID_XY
})
export const updateOption = (name, value) => ({
    type: UPDATE_OPTION,
    name,
    payload: value
})