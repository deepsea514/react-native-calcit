import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//custom components
import AppHeader from '../../common/components/App/Header';
import Button from '../../common/components/Button';

//styles
import authStyles from '../../common/styles/AuthStyles';

//consts
import Colors from '../../common/consts/Colors';
import Helper from '../../common/consts/Helper';
import AsyncStorage from '@react-native-community/async-storage';

//redux imports
import { connect } from 'react-redux';
import { getProjects, searchProjects, getCustomLogo } from '../../actions/ProjectActions';
import { getUserDetailsFromRealm } from '../../actions/UserActions';

//realm actions
import { saveUserDetails } from '../../realm/actions/UserActions';

const ButtonElement = (navigation, props) => {
    return (
        <Button
            title="Duplicate"
            mode="outlined"
            textStyle={{
                fontSize: 12,
            }}
            containerStyle={{
                padding: 3,
                width: '100%'
            }}
            onPress={() => {
                navigation.navigate('NewProject', { data: props })
            }}
        />
    );
}

function Dashboard(props) {

    let { navigation, getCustomLogo } = props;

    const tableHead = ['User Ref', 'Job ID', 'Date Generated', 'Site Address', 'Post Code', 'Action'];

    //getting user details from online api
    useEffect(() => {
        getUserDetails();
        getCustomLogo();
    }, []);

    //search functioanlity
    function handleSearch(query) {
        props.searchProjects(query)
    }

    return (
        <View style={styles.lightBG}>
            <AppHeader
                {...props}
                title="Projects"
                rightButtonTitle={props.userDetails?.name}
                rightButtonOnPress={() => { navigation.navigate('MyProfile') }}
                isRightIcon={true}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.searchbarContainer}>
                    <View style={[authStyles.textInputContainer, { width: '50%' }]}>
                        <View style={authStyles.textInputIconContainer}>
                            <TextInput
                                style={[authStyles.textInputWithRightIcon]}
                                placeholder="Search Project"
                                autoCapitalize="none"
                                onChangeText={(text) => handleSearch(text)}
                            />
                            <TouchableOpacity
                                style={authStyles.inputIconContainer}
                                activeOpacity={0.9}
                            >
                                <Entypo
                                    name="magnifying-glass"
                                    size={15}
                                    color={Colors.borderLight}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="New Project"
                            containerStyle={[styles.buttonStyles]}
                            textStyle={{ fontSize: 12 }}
                            onPress={() => { navigation.navigate('NewProject') }}
                        />
                    </View>
                </View>

                {/* table started */}
                <View style={styles.tableContainer}>
                    {
                        props?.projects?.length > 0 && (
                            // <ScrollView horizontal>
                            <View style={{ width: '100%' }}>
                                <View
                                    style={[styles.row]}
                                >
                                    <View style={[styles.textContainer, styles.smWidth]}>
                                        <Text style={[styles.textHead]}>
                                            {tableHead[0]}
                                        </Text>
                                    </View>
                                    <View style={[styles.textContainer, styles.smWidth]}>
                                        <Text style={[styles.textHead]}>
                                            {tableHead[1]}
                                        </Text>
                                    </View>
                                    <View style={[styles.textContainer, styles.lgWidth]}>
                                        <Text style={[styles.textHead,]}>
                                            {tableHead[2]}
                                        </Text>
                                    </View>
                                    <View style={[styles.textContainer, styles.lgWidth]}>
                                        <Text style={[styles.textHead,]}>
                                            {tableHead[3]}
                                        </Text>
                                    </View>
                                    <View style={[styles.textContainer, styles.mdWidth]}>
                                        <Text style={[styles.textHead,]}>
                                            {tableHead[4]}
                                        </Text>
                                    </View>
                                    <View style={[styles.textContainer, styles.mdWidth]}>
                                        <Text style={[styles.textHead,]}>
                                            {tableHead[5]}
                                        </Text>
                                    </View>
                                </View>
                                {
                                    props.projects.map((rowData, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={[styles.row, index % 2 === 0 && { backgroundColor: '#dddddd66' }]}
                                                key={index}
                                                onPress={() => { openProjectScreen(rowData.id) }}
                                            >
                                                <View style={[styles.textContainer, styles.smWidth]}>
                                                    <Text style={[styles.text,]}>
                                                        {rowData.userReference}
                                                    </Text>
                                                </View>
                                                <View style={[styles.textContainer, styles.smWidth]}>
                                                    <Text style={[styles.text,]}>
                                                        {rowData.jobID}
                                                    </Text>
                                                </View>
                                                <View style={[styles.textContainer, styles.lgWidth]}>
                                                    <Text style={[styles.text,]}>
                                                        {rowData.dateGenerated}
                                                    </Text>
                                                </View>
                                                <View style={[styles.textContainer, styles.lgWidth]}>
                                                    <Text style={[styles.text,]}>
                                                        {rowData.siteAddress}
                                                    </Text>
                                                </View>
                                                <View style={[styles.textContainer, styles.mdWidth]}>
                                                    <Text style={[styles.text,]}>
                                                        {rowData.postCode}
                                                    </Text>
                                                </View>
                                                <View style={[styles.textContainer, styles.mdWidth]}>
                                                    {
                                                        ButtonElement(navigation, rowData)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            // </ScrollView>
                        )
                    }
                    {
                        !props.isLoading && props?.projects?.length === 0 && (
                            <View style={styles.notFoundContainer}>
                                <Image
                                    source={require('../../assets/waiting.png')}
                                    style={styles.waitingImage}
                                    resizeMode="contain"
                                />
                                <Text>Waiting for you to start a new project!!</Text>
                            </View>
                        )
                    }
                </View>
                {/* table ended */}
            </ScrollView>
        </View>
    )
    function openProjectScreen(id) {
        navigation.navigate('Project', { id: id })
    }
    function getUserDetails() {
        let res = Helper('user', 'GET');
        res.then((response) => {
            if (response.status === 'success') {
                saveUserDetails(response.data);
                saveUserId(response.data.id);
            }
        })
            .then(() => {
                props.getUserDetailsFromRealm();
            })
            .then(() => {
                props.fetchAllProjects();
            })
            .catch((error) => {

            })
    }
    async function saveUserId(id) {
        await AsyncStorage.setItem('@id', id.toString())
    }
}

const mapStateToProps = () => state => ({
    isLoading: state.Project.isLoading,
    projects: state.Project.projects,
    userDetails: state.User.userDetails
})

const mapDispatchToProps = () => dispatch => ({
    fetchAllProjects: () => dispatch(getProjects()),
    searchProjects: (query) => dispatch(searchProjects(query)),
    getUserDetailsFromRealm: () => dispatch(getUserDetailsFromRealm()),
    getCustomLogo: () => dispatch(getCustomLogo())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff'
    },
    welcomeText: {
        fontSize: 22,
    },
    searchbarContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
    },
    buttonContainer: {
        marginTop: 20
    },
    buttonStyles: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10
    },
    // table styles
    // container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    tableContainer: {
        padding: 20,
        marginBottom: 40
    },
    head: {
        height: 40,
    },
    textHead: {
        margin: 0,
        color: Colors.textDark,
        fontSize: 13,
    },
    textContainer: {
        // alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderColor: '#dddddd',
        borderTopWidth: 1,
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },
    text: {
        margin: 0,
        fontSize: 13,
    },
    row: {
        flexDirection: 'row'
    },
    btn: {
        width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2
    },
    btnText: {
        textAlign: 'center', color: '#fff'
    },
    waitingImage: {
        width: 200,
        height: 200
    },
    notFoundContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightBG: {
        backgroundColor: '#fff'
    },
    scrollView: {
        minHeight: '100%'
    },
    smWidth: {
        width: '10%'
    },
    mdWidth: {
        width: '15%'
    },
    lgWidth: {
        width: '25%'
    }
})