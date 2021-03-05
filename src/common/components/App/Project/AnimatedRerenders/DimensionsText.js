import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Text } from 'react-native';

export default forwardRef((props, ref) => {

    let { styles, defaultDimensions, lengthConstant } = props;

    const [dimensionsToDisplay, setDimensionsToDisplay] = useState({
        height: defaultDimensions.height,
        width: defaultDimensions.width
    });

    useImperativeHandle(
        ref,
        () => ({
            generateDimensions(layout) {
                setDimensionsToDisplay({
                    ...dimensionsToDisplay,
                    height: (layout.height) * lengthConstant,
                    width: (layout.width) * lengthConstant
                })
            }
        }),
    )
    return (
        <Text
            style={styles.roomDescription}
            numberOfLines={1}
        >
            {dimensionsToDisplay.width} x {dimensionsToDisplay.height}
        </Text>
    )
})