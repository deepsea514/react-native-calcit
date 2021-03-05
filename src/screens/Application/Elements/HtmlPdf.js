import { roomDimensions } from '../../../common/consts/DefaultLengths';
import { Platform } from 'react-native';
import { lengthConstant } from '../../../common/consts/LengthToAppConstant';

export default (
    canvasUri,
    children,
    labels,
    notes,
    dimensions,
    itemMaterialTypes,
    itemsBelongsTo,
    currentDimensions,
    ceilingType,
    cathedralCeilingHeights,
    ceilingHeight,
    customLogo
) => {
    return (
        `
            <div>
                <div>
                    ${header(customLogo, canvasUri)}
                    <img 
                        src="${canvasUri}"
                        style="
                            ${getCanvasStyle()}
                        "
                    />
                    ${footer}
                </div>
                <div style="margin-top: 2vh;"></div>
                <div>
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            align-items: center;
                        "
                    >
                        <style>
                            table {
                                font-family: arial, sans-serif;
                                border-collapse: collapse;
                                width: 100%;
                            }

                            td, th {
                                border: 1px solid black;
                                text-align: left;
                                padding: 3px;
                            }

                            tr:nth-child(even) {
                                background-color: rgba(49, 122, 241, 0.3);
                            }
                            tr:nth-child(odd) {
                                background-color: rgba(49, 122, 241, 0.1);
                            }
                        </style>
                        ${children.map((item, index) => {
            let itemType = getItemType(item);
            let roomDimensions = getDimensions(item.props.id);
            if (itemType === 'Room') return (
                `<div 
                                    key={${index}}
                                    style="${getTableStyles()}"
                                >
                                    <table>
                                        <tr>
                                            <th>${itemType}</th>
                                            <th style="
                                                text-transform: capitalize;
                                            "
                                            >
                                                ${labels[item.props.id] ? labels[item.props.id] : getTitle(itemType, item)}
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>Wall surface m2</td>
                                            <td>
                                            ${getWallSurface(
                    item.props.id,
                    itemsBelongsTo,
                    dimensions,
                    currentDimensions,
                    ceilingType,
                    cathedralCeilingHeights,
                    ceilingHeight
                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ceiling surface m2</td>
                                            <td>${getCeilingSurace(item.props.id, currentDimensions)}</td>
                                        </tr>
                                        <tr>
                                            <td>Architrave l/m</td>
                                            <td>${getArchitraveArea(item.props.id, itemsBelongsTo, dimensions)}</td>
                                        </tr>
                                        <tr>
                                            <td>Skirting l/m</td>
                                            <td>${getSkirting(item.props.id, itemsBelongsTo, dimensions, currentDimensions)}</td>
                                        </tr>
                                        <tr>
                                            <td>Room volume m3</td>
                                            <td>${getRoomVolume(item.props.id, currentDimensions, ceilingType)}</td>
                                        </tr>
                                        ${itemType === 'Item' ? (
                    `<tr>
                                                    <td>Wall tile m2</td>
                                                    <td></td>
                                                </tr>`
                ) : ''
                }
                                        <tr 
                                            style="
                                                background-color: rgb(49, 122, 241); 
                                                color: white;
                                            "
                                        >
                                            <td 
                                                colspan="2" 
                                                style="text-align: center"
                                            >
                                                <b>Room Notes:</b>
                                                <br />
                                                <p>
                                                    ${notes[item.props.id] ? notes[item.props.id] : ''}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>`
            )
            else return ``
        }).join('')
        }
                    </div>
                </div>
                <div style=${getTableMargin()}></div>
                ${windowsLength(children) > 0 ? (
            `
                            <div 
                                style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 100%;
                                    margin-top: 100px;
                                "
                            >
                            <span 
                                style="
                                    font-weight: bold;
                                    font-size: 25px;
                                "
                            >WINDOW SCHEDULE</span>
                        </div>
                    `
        ) : ``}
                    <style>
                        .windowTable {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                            background-color: rgba(0,0,0);
                        }

                        .windowTH {
                            border: 1px solid black;
                            text-align: center;
                            padding: 3px;
                            background-color: rgba(49, 122, 241);
                            color: rgb(255, 255, 255);
                            font-size: 10px;
                        }
                        .windowTD{
                            background-color: rgba(255, 255, 255);
                            text-align: center;
                            font-size: 13px
                        }
                    </style>
                    <div
                        style="
                            background-color: (255, 255, 255)
                        "
                    >
                        <table class="windowTable">
                        ${windowsLength(children) > 0 ? (
            `<tr>
                                    <th class="windowTH">Window</th>
                                    <th class="windowTH">Room</th>
                                    <th class="windowTH">Floor</th>
                                    <th class="windowTH">Internal/External</th>
                                    <th class="windowTH">Width in mm</th>
                                    <th class="windowTH">Height in mm</th>
                                    <th class="windowTH">Type</th>
                                    <th class="windowTH">Material Type</th>
                                    <th class="windowTH">Description</th>
                                </tr>`) : ``}
                            ${children.filter(item => item.props.id.includes('windows')).map((item, index) => {
                return (
                    `
                                        <tr>
                                            <td class="windowTD">W${index + 1}</td>
                                            <td class="windowTD">-</td>
                                            <td class="windowTD">Ground</td>
                                            <td class="windowTD">External</td>
                                            <td class="windowTD">${dimensions[item.props.id]?.width ? dimensions[item.props.id]?.width : '-'}</td>
                                            <td class="windowTD">${dimensions[item.props.id]?.height ? dimensions[item.props.id]?.height : '-'}</td>
                                            <td class="windowTD">${item.props.itemName ? item.props.itemName : '-'}</td>
                                            <td class="windowTD">${itemMaterialTypes[item.props.id] ? itemMaterialTypes[item.props.id] : '-'}</td>
                                            <td class="windowTD">${notes[item.props.id] ? notes[item.props.id] : ''}</td>
                                        </tr>
                                    `
                )
            }).join('')
        }
                        </table>
                    </div>
                    ${doorsLength(children) > 0 ? ` <div 
                        style="display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            margin-top: 100px;"
                    >
                        <span 
                            style="font-weight: bold; font-size: 25px;"
                        >
                            DOORS SCHEDULE
                        </span>
                    </div>`: ``
        }
               
                <style>
                        .windowTable {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                            background-color: rgba(0,0,0);
                        }

                        .windowTH {
                            border: 1px solid black;
                            text-align: left;
                            padding: 3px;
                            background-color: rgba(49, 122, 241);
                            color: rgb(255, 255, 255);
                            font-size: 10px;
                        }
                        .windowTD{
                            background-color: rgba(255, 255, 255);
                            text-align: center;
                            font-size: 13px;
                        }
                        .text-capitalize{
                            text-transform: capitalize;
                        }
                    </style>
                    <div
                        style="
                            background-color: (255, 255, 255)
                        "
                    >
                        <table class="windowTable">
                        ${doorsLength(children) > 0 ?
            `<tr>
                                <th class="windowTH">Door</th>
                                <th class="windowTH">Room</th>
                                <th class="windowTH">Floor</th>
                                <th class="windowTH">Internal/External</th>
                                <th class="windowTH">Width in mm</th>
                                <th class="windowTH">Height in mm</th>
                                <th class="windowTH">Type</th>
                                <th class="windowTH">Material Type</th>
                                <th class="windowTH">Description</th>
                            </tr>`
            : ``}
                            ${children.filter(item => item.props.id.includes('doors')).map((item, index) => {
                return (
                    `
                                        <tr>
                                            <td class="windowTD">D${index + 1}</td>
                                            <td class="windowTD text-capitalize">${itemsBelongsTo[item.props.id]?.room ? labels[itemsBelongsTo[item.props.id].room] : ' - '}</td>
                                            <td class="windowTD">Ground</td>
                                            <td class="windowTD">Internal</td>
                                            <td class="windowTD">${dimensions[item.props.id]?.width ? dimensions[item.props.id]?.width : '-'}</td>
                                            <td class="windowTD">${dimensions[item.props.id]?.height ? dimensions[item.props.id]?.height : '-'}</td>
                                            <td class="windowTD">${item.props.itemName ? item.props.itemName : '-'}</td>
                                            <td class="windowTD">${itemMaterialTypes[item.props.id] ? itemMaterialTypes[item.props.id] : '-'}</td>
                                            <td class="windowTD">${notes[item.props.id] ? notes[item.props.id] : ''}</td>
                                        </tr>
                                    `
                )
            }).join('')
        }
                        </table>
                    </div>
            </div>
        `
    )
}
function getWallSurfaceHelper(h, w) {
    let height = +h / 1000; //in meters
    let width = +w / 1000; //in meters
    return height * width;
}
function getWallSurface(
    id,
    items,
    dimensions,
    currentDimensions,
    ceilingType,
    cathedralCeilingHeights,
    ceilingHeight
) {
    let area = 0;
    let roomItems = [];
    if (id.includes('Room')) {
        Object.keys(items).forEach((item) => {
            if (items[item] && items[item].room === id && (item.includes('doors') || item.includes('windows'))) {
                let itemWidth = dimensions[item]?.width ? dimensions[item].width : 0;
                let itemHeight = dimensions[item]?.height ? dimensions[item].height : 0;
                let wall = items[item]?.wall;
                roomItems.push({
                    item,
                    width: itemWidth,
                    height: itemHeight,
                    wall
                })
            }
        })
    }
    for (let wall = 1; wall <= 4; wall++) {
        let wallItems = roomItems.filter(e => e.wall === wall);
        let wallWidth = ((+currentDimensions[id]?.width * lengthConstant) / 1000);  //m
        let wallHeight = ((+currentDimensions[id]?.height * lengthConstant) / 1000);    //m

        let wallRelatedArea = 0;
        let cH;
        if (!ceilingType[id] || ceilingType[id] === 'normal') {
            cH = ceilingHeight[id] ? +ceilingHeight[id] : 2400;    //mm
        }
        else if (ceilingType[id] === 'cathedral') {
            cH = cathedralCeilingHeights[id][wall] ? cathedralCeilingHeights[id][wall] : 2400;  //mm
        }
        else if (ceilingType[id] === 'raked') {
            cH = ceilingHeight[id] ? +ceilingHeight[id] : 2400;    //mm
        }

        cH = +cH / 1000;     //mm to m
        if (wall % 2 === 0)
            wallRelatedArea = (+wallWidth) * (+cH);
        else
            wallRelatedArea = (+wallHeight) * (+cH);
        for (const item of wallItems) {
            wallRelatedArea -= getWallSurfaceHelper(item.width, item.height);
        }
        // console.log(wallRelatedArea);
        area += wallRelatedArea;
    }
    // console.log(area)
    return `${area.toFixed(2)} m2`
}
function getSkirting(id, items, dimensions, currentDimensions) {
    let area = 0;
    let roomItems = [];
    if (id.includes('Room')) {
        Object.keys(items).map((item, index) => {
            if (items[item] && items[item].room === id && item.includes('doors')) {
                let itemWidth = dimensions[item]?.width ? dimensions[item].width : 0;
                let wall = items[item]?.wall;
                roomItems.push({ item: item, width: itemWidth, wall: wall });
            }
        })
    }
    for (let i = 1; i <= 4; i++) {
        let wallItems = roomItems.filter(e => e.wall === i);
        if (i % 2 === 0) {
            //*length constant means converting px to mm
            // /1000 means converting mm to m
            // px => mm => m
            let wallLength = ((+currentDimensions[id]?.width * lengthConstant) / 1000);
            if (wallLength) {
                for (const item of wallItems) {
                    wallLength -= +item.width / 1000
                }
                area += wallLength;
            }
        }
        else {
            let wallLength = ((+currentDimensions[id]?.height * lengthConstant) / 1000);
            if (wallLength) {
                for (const item of wallItems) {
                    wallLength -= +item.width / 1000
                }
                area += wallLength;
            }
        }
    }
    return `${area.toFixed(2)} l/m`
}
function getRoomVolume(id, dimensions, ceilingType) {
    if (id.includes('Room')) {
        if (!ceilingType[id] || ceilingType[id] === 'normal') {

        }
        else if (ceilingType[id] === 'raked') {

        }
        else if (ceilingType[id] === 'cathedral') {

        }
    }
    return '-'
}

function getCeilingSurace(id, dimensions) {
    let myDimensions = dimensions[id] ? dimensions[id] : { height: 0, width: 0 };
    return `${(((+myDimensions.height * lengthConstant) / 1000) * ((+myDimensions.width * lengthConstant)) / 1000).toFixed(2)} m2`
}
function calcluateDoorArchitrave(height, width) {
    let newHeight = +height / 1000;
    let newWidth = +width / 1000;
    let area = ((newHeight * 2) + newWidth);
    return area;
}
function calcluateWindowsArchitrave(height, width) {
    let newHeight = +height / 1000;
    let newWidth = +width / 1000;
    let area = ((newHeight + newWidth) * 2);
    return area;
}
function getArchitraveArea(id, itemsBelongsTo, dimensions) {
    let area = 0;
    if (id.includes('Room')) {
        Object.keys(itemsBelongsTo).forEach((key, index) => {
            if (itemsBelongsTo[key].room === id) {
                let height = dimensions[key]?.height ? dimensions[key].height : 0;
                let width = dimensions[key]?.width ? dimensions[key].width : 0;
                if (key.includes('doors')) {
                    area += calcluateDoorArchitrave(height, width);
                }
                else if (key.includes('windows')) {
                    area += calcluateWindowsArchitrave(height, width);
                }
            }
        })
    }
    return `${area.toFixed(2)} l/m`;
}
const getTableMargin = () => {
    if (Platform.OS === 'android') {
        return (
            `
            margin-top: 2vh;
            `
        )
    }
    else return (
        `
            margin-top: 2%;
        `
    )
}
const getTableStyles = () => {
    if (Platform.OS === 'android') {
        return (
            `
                display: flex; 
                margin-top: 1vh;
                height: 24vh;
                width: 46vw;
                margin-left: 2vw;
            `
        )
    }
    else return (
        `
            display: flex; 
            margin-top: 75px;
            height: 24%;
            width: 46%;
            margin-left: 2%;
        `
    )
}

const getCanvasStyle = () => {
    if (Platform.OS === 'android') {
        return (
            `
                display: block;
                width: 100vw;
                height: 78vh;
                object-fit: contain;
                object-position: 50% 0;
            `
        )
    }
    else return (
        `
            display: block;
            width: 100%;
            height: 750px;
            object-fit: contain;
            object-position: 50% 0;
        `
    )
}

const headerStyle = () => {
    if (Platform.OS === 'android') {
        return (
            `
                display: flex;
                width: 100vw;
                height: 10vh;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                letter-spacing: 3px;
                color: rgb(50, 50, 50);
        `
        )
    }
    else return (
        `
            display: flex;
            width: 100%;
            height: 100px;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            letter-spacing: 3px;
            color: rgb(50, 50, 50);
        `
    )
}

const getFooterStyle = () => {
    if (Platform.OS === 'android') {
        return (
            `
                display: flex; 
                justify-content: space-between;
                background: rgb(49,122,241);
                align-items: center;
                height: 10vh;
                width: 100vw;
            `
        )
    }
    else return (
        `
            display: flex; 
            justify-content: space-between;
            background: rgb(49,122,241);
            align-items: center;
            height: 100px;
            width: 100%;
        `
    )
}

function getCustomLogo(customLogo, canvasUri) {
    let header = ``;
    if(customLogo && customLogo.uri){
        header = `
            <img 
                src="${customLogo.uri}"
                style="
                    max-width: 190px; 
                    max-height: 90px;
                    object-fit: contain;
                    object-position: 50% 50%;
                    object-position: 0 0; 
                "
                alt="logo"
            />
        `
    }
    else{
        header = `<b>JOHNS LYNG GROUP</b>`
    }
    return header;
}

function header(customLogo, canvasUri) {
    return (
        `
    <div
        style="${headerStyle()}"
    >
        ${getCustomLogo(customLogo, canvasUri)}
    </div>
`
    )
}

const footer = `
    <div style="
            ${getFooterStyle()}
        "
    >
    <div
        style="
            width: 50%
        "
    >
        <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9EAAAWRCAYAAAAmYWenAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAH0aADAAQAAAABAAAFkQAAAABKlDRiAABAAElEQVR4AezcMc6k1RUE0GlrJGeOnLECEjKT4iUQOSFgA14EW2AJJCQOzA7sLTh2QmB7D0TtJgERIPjFq+/e6j5ISIxmdF99p6QRo5Lm9s4/BAgQIECAwNMI3O/3jx4f86+n+SAfQoAAAQIECBAgQIAAAQIE9gl8drvdvt4XSyICBAgQIEDglMDvTh1yhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItAsY0dsblJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjgkY0Y9ROkSAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC7QJG9PYG5SdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBYwJG9GOUDhEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAu4ARvb1B+QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgmIAR/RilQwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQLmBEb29QfgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBA4JmBEP0bpEAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0CxjR2xuUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSOCRjRj1E6RIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLtAkb09gblJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFjAkb0Y5QOESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEC7gBG9vUH5CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOCYgBH9GKVDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAuYERvb1B+AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDgmYEQ/RukQAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLQLGNHbG5SfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBI4JGNGPUTpEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAu0CRvT2BuUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWMCRvRjlA4RIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQLuAEb29QfkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4JiAEf0YpUMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0C5gRG9vUH4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOCZgRD9G6RABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItAsY0dsblJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjgkY0Y9ROkSAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC7QJG9PYG5SdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBYwJG9GOUDhEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAu4ARvb1B+QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgmIAR/RilQwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQLmBEb29QfgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBA4JmBEP0bpEAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0CxjR2xuUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSOCRjRj1E6RIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLtAkb09gblJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFjAkb0Y5QOESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEC7gBG9vUH5CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOCYgBH9GKVDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAuYERvb1B+AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDgmYEQ/RukQAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLQLGNHbG5SfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBI4JGNGPUTpEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAu0CRvT2BuUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWMCRvRjlA4RIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQLuAEb29QfkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4JiAEf0YpUMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0C5gRG9vUH4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOCZgRD9G6RABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQItAsY0dsblJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjgkY0Y9ROkSAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC7QJG9PYG5SdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBYwJG9GOUDhEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAu4ARvb1B+QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgmIAR/RilQwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQLmBEb29QfgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBA4JmBEP0bpEAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0CxjR2xuUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSOCRjRj1E6RIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLtAu/bP0B+AgQIECBA4CcC95/86Pl/8NXjE799/s/0hQQIEPhZgb88fubDn/3Z5/qJ/z0+59/P9Um+hgABAgQIPI3AJ0/zJb/uQ17tz96/TsWvIkCAAAECTyRgRH+iMn0KAQIECBB4CNxeTOGr2+32jxf7Zp9LgACBHwTu9/tHjx+8yoj+98fv+X/94eP9BwECBAgQILBG4PH/JP95hPlgTaB8kFf7s3de1AsECBAgQGCZgL/OfVkh4hAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAnIARfc7eywQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwTMCIvqwQcQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgTsCIPmfvZQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYJmBEX1aIOAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwJ2BEn7P3MgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsEzCiLytEHAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYEzCiz9l7mQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSWCRjRlxUiDgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjMCRjR5+y9TIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLLBIzoywoRhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTmBIzoc/ZeJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFlAkb0ZYWIQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJzAkb0OXsvEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAyASP6skLEIUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE5ASP6nL2XCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCZgBF9WSHiECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCcgBF9zt7LBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILBMwIi+rBBxCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBOwIg+Z+9lAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgmYERfVog4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDAnYESfs/cyAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCwTMKIvK0QcAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgTMKLP2XuZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJYJGNGXFSIOAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwJGNHn7L1MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAssEjOjLChGHAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOYEjOhz9l4mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWUCRvRlhYhDgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnMCRvQ5ey8TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwDIBI/qyQsQhQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgTkBI/qcvZcJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYJmAEX1ZIeIQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwJyAEX3O3ssECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsEzAiL6sEHEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYE7AiD5n72UCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWCZgRF9WiDgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMCdgRJ+z9zIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQILBMwoi8rRBwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBMwos/Ze5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIElgkY0ZcVIg4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIzAkY0efsvUyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECywSM6MsKEYcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE5gSM6HP2XiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBZQJG9GWFiEOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcwJG9Dl7LxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAMgEj+rJCxCFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBOQEj+py9lwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgmYARfVkh4hAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAnIARfc7eywQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwTMCIvqwQcQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgTsCIPmfvZQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYJmBEX1aIOAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwJ2BEn7P3MgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsEzCiLytEHAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYEzCiz9l7mQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSWCRjRlxUiDgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjMCRjR5+y9TIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLLBIzoywoRhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTmBIzoc/ZeJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFlAkb0ZYWIQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJzAkb0OXsvEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAyASP6skLEIUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE5ASP6nL2XCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCZgBF9WSHiECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCcgBF9zt7LBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILBMwIi+rBBxCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBOwIg+Z+9lAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgmYERfVog4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDAnYESfs/cyAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCwTMKIvK0QcAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgTMKLP2XuZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJYJGNGXFSIOAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwJGNHn7L1MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAssEjOjLChGHAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOYEjOhz9l4mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWUCRvRlhYhDgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnMCRvQ5ey8TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwDIBI/qyQsQhQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgTkBI/qcvZcJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYJmAEX1ZIeIQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwJyAEX3O3ssECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsEzAiL6sEHEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYE7AiD5n72UCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWCZgRF9WiDgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMCdgRJ+z9zIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQILBMwoi8rRBwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBMwos/Ze5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIElgkY0ZcVIg4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIzAkY0efsvUyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECywSM6MsKEYcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE5gSM6HP2XiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBZQJG9GWFiEOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcwJG9Dl7LxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAMgEj+rJCxCFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBOQEj+py9lwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgmYARfVkh4hAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAnIARfc7eywQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwTMCIvqwQcQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgTsCIPmfvZQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYJmBEX1aIOAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwJ2BEn7P3MgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsEzCiLytEHAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYEzCiz9l7mQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSWCRjRlxUiDgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjMCRjR5+y9TIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLLBIzoywoRhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTmBIzoc/ZeJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFlAkb0ZYWIQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJzAkb0OXsvEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAyASP6skLEIUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE5ASP6nL2XCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCZgBF9WSHiECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCcgBF9zt7LBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILBMwIi+rBBxCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBOwIg+Z+9lAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgmYERfVog4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDAnYESfs/cyAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCwTMKIvK0QcAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgTMKLP2XuZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJYJGNGXFSIOAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwJGNHn7L1MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAssEjOjLChGHAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOYEjOhz9l4mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWUCRvRlhYhDgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnMCRvQ5ey8TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwDIBI/qyQsQhQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgTkBI/qcvZcJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYJmAEX1ZIeIQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwJyAEX3O3ssECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsEzAiL6sEHEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYE7AiD5n72UCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWCZgRF9WiDgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMCdgRJ+z9zIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQILBMwoi8rRBwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBMwos/Ze5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIElgkY0ZcVIg4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIzAkY0efsvUyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECywSM6MsKEYcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE5gSM6HP2XiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBZQJG9GWFiEOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcwJG9Dl7LxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAMgEj+rJCxCFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBOQEj+py9lwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgmYARfVkh4hAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAnIARfc7eywQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwTMCIvqwQcQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgTsCIPmfvZQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYJmBEX1aIOAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwJ2BEn7P3MgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsEzCiLytEHAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYEzCiz9l7mQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSWCRjRlxUiDgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjMCRjR5+y9TIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLLBIzoywoRhwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTmBIzoc/ZeJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFlAkb0ZYWIQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJzAkb0OXsvEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAyASP6skLEIUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE5ASP6nL2XCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCZgBF9WSHiECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCcgBF9zt7LBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILBMwIi+rBBxCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBOwIg+Z+9lAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgmYERfVog4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDAnYESfs/cyAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCwTMKIvK0QcAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgTMKLP2XuZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJYJGNGXFSIOAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwJGNHn7L1MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAssEjOjLChGHAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOYEjOhz9l4mQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWUC75flEYcAAQIECBAg8BaB+1t+sV9LgAABAtUCH9/v9y+qv0B4AgQIECDwvAJ/eN5P82UECBAgQIDAKwoY0V+xdd9MgAABAgSeR+D2PJ/iSwgQIEDgFwT+9Pj57//1DwECBAgQIECAAAECBAgQIEAgKuCvc4/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqIARPcrrOAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0CRjRm9qSlQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSiAkb0KK/jBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAkYERvaktWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgKGNGjvI4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJOAEb2pLVkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICpgRI/yOk6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQJG9Ka2ZCVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqMD76HXHCRAgQIAAgasF7lc/OPzeq33vMLfnCRBYKPBKvw9+8/D/cmEHIhEgQIAAAQLv3v3tgfDHF4J4pf8He6FafSoBAgQIEPhRwIj+o4X/IkCAAAECzyBwe4aPeMM3vNr3voHGLyVA4EUEXun3wf/ebrd/vkivPpMAAQIECFQJ3O/376oC//awr/T/YL9dywUCBAgQIFAo4K9zLyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIELItmrQAAQABJREFUCBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjYETPuLpKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUCRvTC0kQmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAET3j6ioBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFAoY0QtLE5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgJG9IyrqwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQKGBELyxNZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICBjRM66uEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEChgBG9sDSRCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAj8D5z1lUCBAgQIEBgSOA+9O7Us5/f7/dPph73LgECBBYIfLggw1URPnj8nv/nqx7zDgECBAgQIPAmgd+/6Vf3/+JX+7N3f2O+gAABAgQIvFHAiP5GML+cAAECBAgsF7gtz3c63uenD7pHgAABAmsFPn0k+/5f/xAgQIAAAQIEpgVe7c/e097eJ0CAAAEClwv469wvJ/cgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGwVMKJvbUYuAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELhcwIh+ObkHCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCrgBF9azNyESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMDlAkb0y8k9SIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJbBYzoW5uRiwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQuFzCiX07uQQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDYKmBE39qMXAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwuYAR/XJyDxIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAVgEj+tZm5CJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBywWM6JeTe5AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEtgoY0bc2IxcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIXC5gRL+c3IMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsFXAiL61GbkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4HIBI/rl5B4kQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAga0CRvStzchFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABApcLGNEvJ/cgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGwVMKJvbUYuAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELhcwIh+ObkHCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCrgBF9azNyESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMDlAkb0y8k9SIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJbBYzoW5uRiwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQuFzCiX07uQQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDYKmBE39qMXAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwuYAR/XJyDxIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAVgEj+tZm5CJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBywWM6JeTe5AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEtgoY0bc2IxcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIXC5gRL+c3IMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsFXAiL61GbkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4HIBI/rl5B4kQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAga0CRvStzchFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABApcLGNEvJ/cgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGwVMKJvbUYuAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELhcwIh+ObkHCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGCrgBF9azNyESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMDlAkb0y8k9SIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJbBYzoW5uRiwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQuFzCiX07uQQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBD4Pzt3a7PLeYVhVEc6VYS7hGBXkBoONkwJaSLtmKSBkPQQZmAQ9uUjj4mRJV+juc+z0PhH3rPftQdYuiy/VUBEf+tl7EWAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECjwuI6I+TeyEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIvFVARH/rZexFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAo8LiOiPk3shAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLxVQER/62XsRYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKPC4joj5N7IQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi8VUBEf+tl7EWAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECjwuI6I+TeyEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIvFVARH/rZexFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAo8LiOiPk3shAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLxVQER/62XsRYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKPC4joj5N7IQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi8VUBEf+tl7EWAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECjwuI6I+TeyEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIvFVARH/rZexFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAo8LiOiPk3shAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLxVQER/62XsRYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKPC4joj5N7IQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi8VUBEf+tl7EWAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECjwt8ffyNXkiAAAECBAiUAh/l8BfO/vfnTr+8cC8rESBAgAABAgTeJPDD5zJ/edNCD+zyt893/PrAe7yCAIE7Bf5z58/2qwkQIECAwD0CIvo9t/ZLCRAgQOAOgS93/MzffuXfv3z58vNvf+YPCBAgQIAAAQIEfifw8fHxz8+/+NPv/sb3/Rf+9fnvif5jy+/7xn4dAQIECBAgQIAAgUzA/849ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIEMcy7YQAAEAASURBVCBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyARE9ozWYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNYERPS1i9mXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBDIBET2jNZgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE1gRE9LWL2ZcAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgERPaM1mAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTWBET0tYvZlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyga/ZZIMJECBAgAABAr3At4+Pjx/713gDAQIECBAgQGBa4K/T21ueAAECBAgQIECAAAECDwuI6A+Dex0BAgQIECDwpwp8+1OnGUaAAAECBAgQIECAAAECBAgQIECAAAEC1wv437lf/wkAIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEjIKIfCU8CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQuF5ARL/+EwBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAkdARD8SngQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwvYCIfv0nAIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjoCIfiQ8CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOB6ARH9+k8AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgcARH9SHgSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwPUCIvr1nwAAAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDgCIvqR8CRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB6wVE9Os/AQAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgcARE9CPhSYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLXC4jo138CAAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgCIjoR8KTAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBK4XENGv/wQAECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMARENGPhCcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIXC8gol//CQAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSMgoh8JTwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4XkBEv/4TAECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECR0BEPxKeBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHC9gIh+/ScAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSOgIh+JDwJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4HoBEf36TwAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBwBEf1IeBIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDA9QIi+vWfAAACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOAIi+pHwJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHrBUT06z8BAAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwBET0I+FJgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAtcLiOjXfwIACBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOAIiOhHwpMAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIErhcQ0a//BAAQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwBEQ0Y+EJwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhcLyCiX/8JACBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBIyCiHwlPAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELheQES//hMAQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJHQEQ/Ep4ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgcL2AiH79JwCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBI6AiH4kPAkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgegER/fpPAAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIHAER/Uh4EiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMD1AiL69Z8AAAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBA4AiL6kfAkQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgesFRPTrPwEABAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHAERPQj4UmAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC1wuI6Nd/AgAIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4AiI6EfCkwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSuFxDRr/8EABAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAERDRj4QnAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFwvIKJf/wkAIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEjIKIfCU8CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQuF5ARL/+EwBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAkdARD8SngQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwvYCIfv0nAIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjoCIfiQ8CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOB6ARH9+k8AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgcARH9SHgSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwPUCIvr1nwAAAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDgCIvqR8CRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB6wW+Xi8AgAABAgQIfF8C//38Of/4vn6SX0OAAAECBAgQIEDgDwv87w//E/4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4P/s3QucJFlZJ+xpGLk5MM19UViK+x2aq1x3akTwMlxaVhAXdGoQFBdkGhX9lpWdAhRRYOkRdnVR6B5hBVx3pwcVEJCuRkARdHq4i7DdjYCrovRw/eT7tPf/zmRBTU1Vd1ZWZuSJzOf8fm9lVmbEOe95IjIjMk5GJAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ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"
            style="
                width: 70px;
                height: 70px;
                object-fit: contain;
            "
        />
    </div>
        <div 
            style="
                color: white;
            "
        >
            This report is generated by the CalcIT Floor Planner app available on the Android and iOS devices. 
            <br/>
            <b>www.calcitfloorplanner.com</b>
        </div>
    </div>
`

function getDimensions(id) {
    let returnDimensions = {
        height: '',
        width: ''
    };
    Object.keys(roomDimensions).map((key, index) => {
        if (id.includes(key))
            returnDimensions = {
                height: roomDimensions[key].height + ' mm',
                width: roomDimensions[key].width + ' mm'
            }
    })
    return returnDimensions;
}
function doorsLength(children) {
    let doors = children.filter(item => item.props.id.includes('doors'))
    return doors.length
}
function windowsLength(children) {
    let windows = children.filter(item => item.props.id.includes('windows'))
    return windows.length
}
function getDoorWindowItem(item) {
    let { id } = item.props;
    if (id.includes('doors')) {
        return 'doors'
    }
    else if (id.includes('windows')) {
        return 'windows'
    }
    else return false
}

function getItemType(item) {
    let {
        id
    } = item.props;
    if (id.includes('defaultRoom')) {
        return 'Room'
    } else if (id.includes('item')) {
        return 'Item'
    } else return 'Other';
}

function getTitle(itemType, item) {
    if (itemType === 'Room') {
        return (
            item.props.children.props.roomType
        )
    } else if (itemType === 'Item') {
        return (
            item.props.children.props.itemName
        )
    } else return '';
}