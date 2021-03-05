import React, { useState, useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';

//styles
import styles from '../../../common/styles/ProjectScreenStyles';

//sketch canvas
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';


export default function FreeDraw({ isFreeDraw, isEraser, eraserStroke, freeDrawColor, freeDrawStroke, toggleDimensions, canvasRef }) {

    //isFreeDraw => user has selected tool free draw
    //isEraser => user has selected eraser
    //eraserStroke => stroke of the eraser selected by the user
    //freeDrawColor => color of the stroke selected by the user
    //freeDrawStroke => stroke size of the free draw tool selected by the user

    //current dimensions of the screen
    const [currentDimensions, setCurrentDimensions] = useState({
        WIDTH: Dimensions.get('window').width,  //widht -> current screen
        HEIGHT: Dimensions.get('window').height //height -> current screen
    });


    function changeCurrentDimensions(e) {
        const { width, height } = e.window;
        setCurrentDimensions({
            ...currentDimensions,
            WIDTH: width,
            HEIGHT: height
        });
    }

    //adding event listner so that dimensions can be listned
    useEffect(() => {
        Dimensions.removeEventListener('change', changeCurrentDimensions);

        //adding event listner
        Dimensions.addEventListener('change', changeCurrentDimensions);
        //remove event listner
        //cleanup
        return () => {
            Dimensions.removeEventListener('change', changeCurrentDimensions);
        };
    }, [toggleDimensions]);
    
    return (
        //image background is used to show the grid behind the scene
        <>
            {/* <View
                //grid is stored in local assets
                style={[
                    styles.freeDrawContainer,
                    {
                        height: '100%',
                        backgroundColor: 'transparent'
                    }
                ]}
            /> */}
            <SketchCanvas
                ref={canvasRef}
                style={{ height: '100%', width: '100%' }}
                touchEnabled={true}
                strokeColor={setStrokeColor()}
                strokeWidth={setStrokeWidth()}
            />
        </>
    )

    //getting curented stroke color
    function setStrokeColor() {
        //color selected from modal || #000000
        if (isFreeDraw) return freeDrawColor;
        //if eraser or any other element is in 
        //focus then the color is transparent
        else return 'transparent';
    }

    //getting stroke width depending on
    //freedraw or eraser
    function setStrokeWidth() {
        //if is freedraw then return freedrawstroke
        if (isFreeDraw) return freeDrawStroke;
        //else if eraser is selected then return
        //its default width or selected from modal
        else if (isEraser) return eraserStroke;
        //if any other element is selected then return 0 widht
        else return 0;
    }
}