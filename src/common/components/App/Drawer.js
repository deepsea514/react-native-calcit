import React from 'react';
import { useRoute } from '@react-navigation/native';

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//constants
import Colors from '../../consts/Colors';
import AsyncStorage from '@react-native-community/async-storage';

//redux imports
import { connect } from 'react-redux';
import { appLogout } from '../../../actions/AuthActions';
import { clearProjects } from '../../../actions/ProjectActions';
import { clearUserDetails } from '../../../actions/UserActions';

function Drawer(props) {

    let { navigation } = props;

    const state = navigation.dangerouslyGetState();
    let actualRoute = state.routes[state.index]?.key;

    return (
        <>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <ScrollView contentContainerStyle={styles.container}>

                <TouchableOpacity
                    style={[styles.listContainer, actualRoute.includes('Dashboard') && styles.activeList]}
                    onPress={() => { navigation.navigate('Dashboard') }}
                >
                    <Entypo
                        name="shop"
                        size={20}
                        color={actualRoute.includes('Dashboard') ? Colors.primary : Colors.textDark}
                    />
                    <Text style={[styles.listText, actualRoute.includes('Dashboard') && styles.activeText]}>Projects</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.listContainer, actualRoute.includes('Settings') && styles.activeList]}
                    onPress={() => { navigation.navigate('Settings') }}
                >
                    <Entypo
                        name="cog"
                        size={20}
                        color={actualRoute.includes('Settings') ? Colors.primary : Colors.textDark}
                    />
                    <Text style={[styles.listText, actualRoute.includes('Settings') && styles.activeText]}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.listContainer}
                    onPress={() => { logout() }}
                >
                    <Entypo
                        name="log-out"
                        size={20}
                        color={Colors.textDark}
                    />
                    <Text style={styles.listText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Copyright © CalcIT</Text>
            </View>
        </>
    )
    async function logout() {
        //logout logic 
        let { appLogout, clearProjects, clearUserDetails } = props;
        await AsyncStorage.removeItem('@access_token');
        clearProjects();
        clearUserDetails();
        appLogout();
        //this function is calling the redux action
        //to logout from the state
    }
}

const mapDispatchToProps = () => dispatch => ({
    appLogout: () => dispatch(appLogout()),
    clearProjects: () => dispatch(clearProjects()),
    clearUserDetails: () => dispatch(clearUserDetails())
})

export default connect(null, mapDispatchToProps)(Drawer);

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        padding: 5
    },
    logoContainer: {
        height: '30%',
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: '60%',
        width: '100%'
    },
    listContainer: {
        padding: 7,
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    activeList: {
        backgroundColor: Colors.primaryLight,
    },
    activeText: {
        color: Colors.primary,
    },
    listText: {
        marginLeft: 10,
        color: Colors.textDark
    },
    footerContainer: {
        padding: 10
    },
    footerText: {
        color: Colors.textDark,
        fontSize: 12
    }
})