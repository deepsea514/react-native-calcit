import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//custom components
import AppHeader from '../../common/components/App/Header';
import Button from '../../common/components/Button';

//styles
import authStyles from '../../common/styles/AuthStyles';

//constants
import Colors from '../../common/consts/Colors';
import moment from 'moment';

//helper functions
import { insertNewProject } from '../../realm/actions/ProjectActions';
import { v1 as uuidv1 } from 'react-native-uuid';

//redux imports
import { connect } from 'react-redux';
import { getProjects } from '../../actions/ProjectActions';
import AsyncStorage from '@react-native-community/async-storage';

function NewProject(props) {

    let { navigation, route } = props;

    const duplicateData = route.params?.data;

    //states for new project component
    const [state, setState] = useState({
        userReference: '',
        jobID: '',
        dateGenerated: moment().format('YYYY-MM-DD HH:mm:ss'),
        siteAddress: '',
        postCode: ''
    });
    const [errors, setErrors] = useState({
        userReference: false,
        jobID: false,
        dateGenerated: false,
        siteAddress: false,
        postCode: false
    })
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        //if duplicate action
        //then set the state
        if (duplicateData) {
            let { userReference, jobID, postCode, siteAddress } = duplicateData;
            setState({
                ...state,
                jobID,
                userReference,
                postCode,
                siteAddress
            })
        }
    }, [duplicateData]);

    const { userReference, jobID, dateGenerated, siteAddress, postCode } = state;

    return (
        <>
            <AppHeader
                {...props}
                icon="chevron-left"
                title="New Project"
                isRightButton={false}
                leftIconOnPress={navigation.goBack}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <KeyboardAvoidingView
                    enabled
                    behavior="padding"
                >
                    <View style={authStyles.formContainer}>
                        <View style={[authStyles.textInputContainer]}>
                            <Text style={authStyles.labelText}>User Reference</Text>
                            <TextInput
                                style={[authStyles.textInput, errors.userReference ? authStyles.error : null]}
                                autoCapitalize="none"
                                value={userReference}
                                onChangeText={(text) => { handleChange(text, 'userReference') }}
                            />
                        </View>
                        <View style={[authStyles.textInputContainer]}>
                            <Text style={authStyles.labelText}>Job ID</Text>
                            <TextInput
                                style={[authStyles.textInput, errors.jobID ? authStyles.error : null]}
                                autoCapitalize="none"
                                value={jobID}
                                onChangeText={(text) => { handleChange(text, 'jobID') }}
                            />
                        </View>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Date Generated</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon]}
                                    autoCapitalize="none"
                                    editable={false}
                                    value={dateGenerated}
                                />
                                <TouchableOpacity
                                    style={authStyles.inputIconContainer}
                                    activeOpacity={0.9}
                                >
                                    <Entypo
                                        name="calendar"
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Site Address</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, errors.siteAddress ? authStyles.error : null]}
                                    value={siteAddress}
                                    onChangeText={(text) => { handleChange(text, 'siteAddress') }}
                                />
                                <TouchableOpacity
                                    style={authStyles.inputIconContainer}
                                    activeOpacity={0.9}
                                >
                                    <Entypo
                                        name="v-card"
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Post Code</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, errors.postCode ? authStyles.error : null]}
                                    autoCapitalize="none"
                                    value={postCode}
                                    onChangeText={(text) => { handleChange(text, 'postCode') }}
                                />
                                <TouchableOpacity
                                    style={authStyles.inputIconContainer}
                                    activeOpacity={0.9}
                                >
                                    <Entypo
                                        name="mail"
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Create Project"
                                onPress={validation}
                                loading={isLoading}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
    //handeling text change on all input fields
    function handleChange(text, name) {
        setState({
            ...state,
            [name]: text
        });
    };
    //checking validations
    function validation() {
        if (userReference === '') {
            setErrorState('userReference');
        }
        else if (jobID === '') {
            setErrorState('jobID');
        }
        else if (dateGenerated === '') {
            setErrorState('dateGenerated');
        }
        else if (siteAddress === '') {
            setErrorState('siteAddress');
        }
        else if (postCode === '') {
            setErrorState('postCode');
        }
        else {
            saveNewProject();
        }
    }
    //handeling data errors
    function setErrorState(name) {
        setErrors({
            ...errors,
            userReference: false,
            jobID: false,
            dateGenerated: false,
            siteAddress: false,
            postCode: false,
            [name]: true
        })
    }
    async function saveNewProject() {
        setIsLoading(true);
        let id = await AsyncStorage.getItem('@id');
        let body = {
            id: uuidv1(),
            userReference,
            jobID,
            dateGenerated,
            postCode,
            siteAddress,
            userId: +id
        }
        try {
            let response = await insertNewProject({ ...body });
            if (response.response) {
                props.fetchAllProjects();
                navigation.goBack();
            }
        }
        catch (e) {
            alert("Error while saving the project, Please contact Admin!!")
        }
        finally {
            setIsLoading(false);
        }
    }
}

const mapDispatchToProps = () => dispatch => ({
    fetchAllProjects: () => dispatch(getProjects())
})

export default connect(null, mapDispatchToProps)(NewProject);

const styles = StyleSheet.create({
    container: {
        minHeight: '100%'
    },
    formContainer: {
        padding: 20
    },
    buttonContainer: {
        marginTop: 10,
        width: '50%',
        alignSelf: 'center'
    }
})