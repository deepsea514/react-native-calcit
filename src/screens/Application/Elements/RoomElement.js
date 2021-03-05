import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//making the element draggable
import ElementContainer from './ElementContainer';

//length constnat
import { lengthConstant } from '../../../common/consts/LengthToAppConstant';

export default function RoomElement(props) {
    let walls = props.walls.slice();
    return (
        walls.map((wall, index) => {
            return (
                <ElementContainer
                    {...props}
                    key={index}
                    isWall={true}
                >
                    <View style={
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: wall.alignment === 'horizontal' ? 10 : 0
                        }}
                    >
                        <View
                            style={[styles.wall,
                            {
                                width: getDimensions(wall, 'width'),
                                height: getDimensions(wall, 'height')
                            }
                            ]}
                        >
                        </View>
                    </View>
                </ElementContainer>
            )
        })
    )
    function getDimensions(wall, type) {
        let length = +wall.length / lengthConstant;
        let width = +wall.internalWallWidth / lengthConstant;
        if (type === 'width' && wall.alignment === 'horizontal') {
            return length;
        }
        else if (type === 'width' && wall.alignment === 'vertical') {
            return width;
        }
        else if (type === 'height' && wall.alignment === 'horizontal') {
            return width;
        }
        else if (type === 'height' && wall.alignment === 'vertical') {
            return length;
        }
    }
}


const styles = StyleSheet.create({
    wall: {
        backgroundColor: '#000',
    }
})