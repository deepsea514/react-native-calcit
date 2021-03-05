import React, { useState, useEffect } from 'react';
import { View, Switch, Text, ScrollView } from 'react-native';

//consts
import Colors from '../../../consts/Colors';
import styles from '../../../styles/ProjectScreenStyles';

//custom components
import Button from '../../Button';

//redux
import { connect } from 'react-redux';
import { setArtboardDraggable, setShowOptions, toggleCarpentryVisible, toggleElectricalVisible, togglePlumbingVisible, updateVisibilityItems } from '../../../../actions/OptionActions';

function BottomBar({
    captureView,
    isGeneratingPDF,
    artboardDraggable,
    setArtboardDraggable,
    isCarpentryVisible,
    isPlumbingVisible,
    isElectricalVisible,
    isDoorsVisible,
    isWindowsVisible,
    isAirConditioningVisible,
    isFireServicesVisible,
    isGlazingVisible,
    isMiscVisible,
    updateVisibilityItems,
    childrenElements,
    showOptions,
    setShowOptions
}) {

    const [cPButton, setCPButton] = useState(false);
    const [pbButton, setpbButton] = useState(false);
    const [elButton, setelButton] = useState(false);
    const [drButton, setdrButton] = useState(false);
    const [wdButton, setwdButton] = useState(false);
    const [acButton, setacButton] = useState(false);
    const [fsButton, setfsButton] = useState(false);
    const [glButton, setglButton] = useState(false);
    const [msButton, setmsButton] = useState(false);

    useEffect(() => {
        generateButtonsDynamic();
    }, [childrenElements])

    function generateButtonsDynamic() {

        let cpFound = false;
        let pbFound = false;
        let elFound = false;
        let drFound = false;
        let wdFound = false;
        let acFound = false;
        let fsFound = false;
        let glFound = false;
        let msFound = false;

        for (const element of childrenElements) {
            if (element.props.id.includes('carpentry')) {
                setCPButton(true)
                cpFound = true
            }
            if (element.props.id.includes('plumbing')) {
                setpbButton(true)
                pbFound = true
            }
            if (element.props.id.includes('electrical')) {
                setelButton(true)
                elFound = true
            }
            if (element.props.id.includes('doors')) {
                setdrButton(true)
                drFound = true
            }
            if (element.props.id.includes('windows')) {
                setwdButton(true)
                wdFound = true
            }
            if (element.props.id.includes('airConditioning')) {
                setacButton(true)
                acFound = true
            }
            if (element.props.id.includes('glazing')) {
                setglButton(true)
                glFound = true
            }
            if (element.props.id.includes('misc')) {
                setmsButton(true)
                msFound = true
            }
            if (element.props.id.includes('fireServices')) {
                setfsButton(true)
                fsFound = true
            }
        }
        if (!cpFound) {
            setCPButton(false)
        }
        if (!pbFound) {
            setpbButton(false)
        }
        if (!elFound) {
            setelButton(false)
        }
        if (!drFound) {
            setdrButton(false)
        }
        if (!wdFound) {
            setwdButton(false)
        }
        if (!acFound) {
            setacButton(false)
        }
        if (!fsFound) {
            setfsButton(false)
        }
        if (!glFound) {
            setglButton(false)
        }
        if (!msFound) {
            setmsButton(false)
        }
    }

    return (
        <View
            style={[
                {
                    position: 'absolute',
                    width: '100%',
                    backgroundColor: '#ccc',
                    height: 85,
                    bottom: 0
                }
            ]}
        >
            <View style={styles.bottomBarContainer}>
                <View style={styles.bottomLeftBar}>
                    <ScrollView horizontal={true}>
                        {
                            elButton && (
                                <Button
                                    onPress={() => { updateVisibilityItems('isElectricalVisible', !isElectricalVisible) }}
                                    title="Electric"
                                    mode={isElectricalVisible ? 'default' : 'outlined'}
                                    containerStyle={[styles.commonButton, !isElectricalVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                    textStyle={[styles.textButtonCommon, isElectricalVisible ? null : styles.textButton]}
                                />
                            )
                        }
                        {
                            cPButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isCarpentryVisible', !isCarpentryVisible) }}
                                        title="Carpentry"
                                        containerStyle={[styles.commonButton, !isCarpentryVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isCarpentryVisible ? null : styles.textButton]}
                                        mode={isCarpentryVisible ? 'default' : 'outlined'}
                                    />
                                </View>
                            )
                        }
                        {
                            pbButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isPlumbingVisible', !isPlumbingVisible) }}
                                        title="Plumbing"
                                        mode={isPlumbingVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isPlumbingVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isPlumbingVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            drButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isDoorsVisible', !isDoorsVisible) }}
                                        title="Doors"
                                        mode={isDoorsVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isDoorsVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isDoorsVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            wdButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isWindowsVisible', !isWindowsVisible) }}
                                        title="Windows"
                                        mode={isWindowsVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isWindowsVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isWindowsVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            acButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isAirConditioningVisible', !isAirConditioningVisible) }}
                                        title="AC"
                                        mode={isAirConditioningVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isAirConditioningVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isAirConditioningVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            fsButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isFireServicesVisible', !isFireServicesVisible) }}
                                        title="Fire Services"
                                        mode={isFireServicesVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isFireServicesVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isFireServicesVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            glButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isGlazingVisible', !isGlazingVisible) }}
                                        title="Glazing"
                                        mode={isGlazingVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isGlazingVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isGlazingVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                        {
                            msButton && (
                                <View style={styles.ml10}>
                                    <Button
                                        onPress={() => { updateVisibilityItems('isMiscVisible', !isMiscVisible) }}
                                        title="Misc"
                                        mode={isMiscVisible ? 'default' : 'outlined'}
                                        containerStyle={[styles.commonButton, !isMiscVisible ? (styles.outlinedButton) : { backgroundColor: Colors.ornage }]}
                                        textStyle={[styles.textButtonCommon, isMiscVisible ? null : styles.textButton]}
                                    />
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
                <View style={[styles.bottomLeftBar, { justifyContent: 'flex-end' }]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={[styles.listContainer]}>
                            <Text style={styles.mw80}>Pin Artboard</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: Colors.primary }}
                                thumbColor={'#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => { setArtboardDraggable(artboardDraggable ? false : true) }}
                                value={!artboardDraggable}
                                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                            />
                        </View>
                        {/* <Button
                            // loading={isGeneratingPDF}
                            title="Artboard Motion"
                            containerStyle={[styles.commonButton]}
                            textStyle={styles.textButtonCommon}
                            onPress={() => { setArtboardDraggable(previousState => !previousState) }}
                        /> */}
                    </View>
                    <Button
                        loading={isGeneratingPDF}
                        title="CalcIT"
                        containerStyle={[styles.commonButton]}
                        textStyle={styles.textButtonCommon}
                        onPress={() => {
                            setShowOptions({
                                ...showOptions,
                                isVisible: false,
                                id: null,
                                selectedOption: ''
                            })
                            captureView();
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = () => state => ({
    artboardDraggable: state.Options.artboardDraggable,
    childrenElements: state.Options.childrenElements,

    //flags
    isCarpentryVisible: state.Options.isCarpentryVisible,
    isPlumbingVisible: state.Options.isPlumbingVisible,
    isElectricalVisible: state.Options.isElectricalVisible,
    isDoorsVisible: state.Options.isDoorsVisible,
    isWindowsVisible: state.Options.isWindowsVisible,
    isAirConditioningVisible: state.Options.isAirConditioningVisible,
    isFireServicesVisible: state.Options.isFireServicesVisible,
    isGlazingVisible: state.Options.isGlazingVisible,
    isMiscVisible: state.Options.isMiscVisible,
    showOptions: state.Options.showOptions
})

const mapDispatchToProps = () => dispatch => ({
    setArtboardDraggable: (payload) => dispatch(setArtboardDraggable(payload)),
    toggleCarpentryVisible: (visibility) => dispatch(toggleCarpentryVisible(visibility)),
    toggleElectricalVisible: (visibility) => dispatch(toggleElectricalVisible(visibility)),
    togglePlumbingVisible: (visibility) => dispatch(togglePlumbingVisible(visibility)),
    updateVisibilityItems: (name, value) => dispatch(updateVisibilityItems(name, value)),
    setShowOptions: (options) => dispatch(setShowOptions(options)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);