import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions, Image, View, PanResponder } from 'react-native';

//styles
import styles from '../../../common/styles/ProjectScreenStyles';

//sketch canvas
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import Canvas, {Path2D} from 'react-native-canvas';
import { Path } from 'react-native-svg';
import { clearTestState } from 'realm';
import FreeDraw from './FreeDraw';
// import {path2dPolyfill} from 'path2d-polyfill';

export default function SprayDraw({ isEraser, eraserStroke, isFreeDraw, freeDrawColor, freeDrawStroke, isSprayDraw, sprayDrawColor, sprayDrawStroke, sprayDrawDensity, toggleDimensions, canvasRef }) {

    //isSprayDraw => user has selected tool spray draw
    //isEraser => user has selected eraser
    //eraserStroke => stroke of the eraser selected by the user
    //sprayDrawColor => color of the stroke selected by the user
    //sprayDrawStroke => stroke size of the spray draw tool selected by the user

    //current dimensions of the screen
    const [currentDimensions, setCurrentDimensions] = useState({
        WIDTH: Dimensions.get('window').width,  //widht -> current screen
        HEIGHT: Dimensions.get('window').height //height -> current screen
    });

    let sprayIntervalID;
    let ctx = null;
    // const [ctx, setCtx] = useState(null);
    // const [ctx, setCTX] = useState(null);
    const [coordinate, setCoordinate] = useState({x: 0, y: 0})
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
    useEffect(() => {
        canvasRef.current.width = currentDimensions.WIDTH;
        canvasRef.current.height = currentDimensions.HEIGHT;
    }, [])
    useEffect(() => {
        ctx = canvasRef.current.getContext('2d');
        ctx.globalCompositeOperation = "source-over"
        if (isSprayDraw) {
            ctx.fillStyle = sprayDrawColor;
        }
        if (isFreeDraw) {
            ctx.lineWidth = freeDrawStroke;
            ctx.strokeStyle = freeDrawColor;
            ctx.lineCap='round';
        }
        if (isEraser) {
            ctx.globalCompositeOperation="destination-out";
            ctx.lineCap='round';
        }
    }, [isFreeDraw, isSprayDraw, sprayDrawColor, freeDrawStroke, freeDrawColor, eraserStroke, sprayDrawDensity, sprayDrawStroke])


    // useEffect(() => {
    //     ctx.lineCap = 'round';
    //     ctx.fillStyle = sprayDrawColor;
    // }, [sprayDrawColor]);
    // useEffect(() => {
    //     ctx.lineCap = 'round';
    //     ctx.fillStroke = sprayDrawStroke;
    // }, [sprayDrawStroke]);
    // useEffect(() => {
    //     ctx.lineCap = 'round';
    //     ctx.strokeStyle = freeDrawColor;
    // }, [freeDrawColor]);
    // useEffect(() => {
    //     ctx.lineCap = 'round';
    //     ctx.lineWidth = freeDrawStroke;
    // }, [freeDrawStroke]);
    function generateSprayParticles (coordinate) {
        var density = sprayDrawDensity;
        var svgPath = '';
		for (var i = 0; i < density; i++) {
			var offset = getRandomOffset(sprayDrawStroke);
			var x = coordinate.x + offset.x;
			var y = coordinate.y + offset.y;
            svgPath += ('M' + x + ',' + y + ' h1 v1 h -1 z ')
		}
        var path = new Path2D(canvasRef.current, svgPath);
        ctx.fill(path);
    }   
    function getRandomOffset (radius) {
		var random_angle = Math.random() * (2*Math.PI);
		var random_radius = Math.random() * radius;
		
		return {
			x: Math.cos(random_angle) * random_radius,
			y: Math.sin(random_angle) * random_radius
		};
	}
    function generateSolidLine(pos1, pos2)
    {
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();
    }
    function eraseDrawing(pos)
    {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, eraserStroke, 0, Math.PI*2,false);
        ctx.fill();
    }
    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            console.log("Started");
            if (isSprayDraw)
                sprayIntervalID = setInterval(function() {generateSprayParticles({x: gestureState.moveX, y: gestureState.moveY})}, 50);
            if (isFreeDraw || isEraser)
                setCoordinate({x: gestureState.x0, y: gestureState.y0})
        },  
        onPanResponderMove: (evt, gestureState) => {
            let x = gestureState.moveX;
            let y = gestureState.moveY;
            if (isFreeDraw) {
                setCoordinate((prevState) => {
                    generateSolidLine(prevState, {x: x, y: y} )
                    return {...prevState, x: x, y: y}
                })
            }
            if (isEraser) {
                eraseDrawing({x: x, y: y});
            }
            if (isSprayDraw) {
                generateSprayParticles({x: x, y: y});
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (sprayIntervalID) {
                console.log("Released");
                clearInterval(sprayIntervalID);
            }
        },
    }), [isFreeDraw, isSprayDraw, isEraser, eraserStroke, sprayDrawDensity, sprayDrawStroke])
    // const panResponder = useMemo(() => PanResponder.create({
    //     onStartShouldSetPanResponder: (evt, gestureState) => true,
    //     onPanResponderGrant: (evt, gestureState) => {
    //         console.log("Started");
    //         if (isSprayDraw)
    //             sprayIntervalID = setInterval(function() {generateSprayParticles({x: gestureState.moveX, y: gestureState.moveY})}, 50);
    //         if (isFreeDraw)
    //             setCoordinate({x: gestureState.x0, y: gestureState.y0})
    //     },  
    //     onPanResponderMove: (evt, gestureState) => {
    //         if (isFreeDraw) {
    //             setCoordinate((prevState) => {
    //                 let x = gestureState.moveX;
    //                 let y = gestureState.moveY;
    //                 generateSolidLine(prevState, {x: x, y: y} )
    //                 return {...prevState, x: x, y: y}
    //             })
    //         }
    //         if (isSprayDraw) {
    //             generateSprayParticles({x: gestureState.moveX, y: gestureState.moveY});
    //         }
    //     },
    //     onPanResponderRelease: (evt, gestureState) => {
    //         if (sprayIntervalID) {
    //             console.log("Released");
    //             clearInterval(sprayIntervalID);
    //         }
    //     },
    //   }), [isFreeDraw, isSprayDraw]);
    return (
        //image background is used to show the grid behind the scene
        <View
            {...panResponder.panHandlers}
            style={{ 
                height: "100%", 
                width: '100%' }}
        >
            <Canvas 
                ref={canvasRef}
                style={{height: "100%", width: "100%" }}
            />
        </View>
    )

    //getting curented stroke color
    function setStrokeColor() {
        //color selected from modal || #000000
        if (isSprayDraw) return sprayDrawColor;
        //if eraser or any other element is in 
        //focus then the color is transparent
        else return 'transparent';
    }

    //getting stroke width depending on
    //spraydraw or eraser
    function setStrokeWidth() {
        //if is spraydraw then return spraydrawstroke
        if (isSprayDraw) return sprayDrawStroke;
        //else if eraser is selected then return
        //its default width or selected from modal
        else if (isEraser) return eraserStroke;
        //if any other element is selected then return 0 widht
        else return 0;
    }
}