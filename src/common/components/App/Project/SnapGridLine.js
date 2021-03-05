import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';

//redux imports
import { connect } from 'react-redux';

import styles from '../../../styles/ProjectScreenStyles';

function SnapGridLine(props) {

    //prpos
    let { snapGrid } = props;
    console.log(props.snapGrid);
    return (
        <View />
    )
}


const mapStateToProps = () => state => ({
    snapGrid: state.Options.snapGrid
});
export default connect(mapStateToProps)(SnapGridLine);