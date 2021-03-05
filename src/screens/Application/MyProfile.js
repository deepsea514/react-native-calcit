import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//custom components
import AppHeader from '../../common/components/App/Header';
import Button from '../../common/components/Button';

// constants
import Colors from '../../common/consts/Colors';
import AsyncStorage from '@react-native-community/async-storage';

//styles
import authStyles from '../../common/styles/AuthStyles';

//actions
import { fetchUserDetails, updatePassword } from '../../realm/actions/UserActions';

//redux imports
import { connect } from 'react-redux';
import { saveUserDetailsToRealm } from '../../actions/UserActions'

function MyProfile(props) {

    let { navigation } = props;

    useEffect(() => { fetchDetails() }, []);

    //states
    const [state, setState] = useState({
        name: '',
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        name: false,
        oldPassword: false,
        password: false,
        confirmPassword: false
    })

    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    let { name, oldPassword, password, confirmPassword } = state;

    return (
        <>
            <AppHeader
                {...props}
                title="My Profile"
                icon="chevron-left"
                isRightButton={false}
                leftIconOnPress={() => { navigation.goBack() }}
            />
            <KeyboardAvoidingView enabled behavior="padding" >
                <ScrollView contentContainerStyle={styles.container}>
                    {/* form started */}
                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.cameraContainer}>
                            <Entypo
                                name="camera"
                                size={30}
                                color={Colors.textDark}
                            />
                        </TouchableOpacity>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Name</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, error.name ? styles.error : null]}
                                    placeholder="John Smith"
                                    autoCapitalize="none"
                                    value={name}
                                    onChangeText={(text) => { handleChange(text, 'name') }}
                                />
                                <TouchableOpacity
                                    style={[authStyles.inputIconContainer, error.name ? styles.error : null]}
                                    activeOpacity={0.9}
                                >
                                    <Entypo
                                        name="edit"
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.changePasswordText}>Change Password</Text>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Old Password</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, error.oldPassword ? styles.error : null]}
                                    placeholder="**********"
                                    autoCapitalize="none"
                                    value={oldPassword}
                                    secureTextEntry={showOldPassword}
                                    onChangeText={(text) => { handleChange(text, 'oldPassword') }}
                                />
                                <TouchableOpacity
                                    style={[authStyles.inputIconContainer, error.oldPassword ? styles.error : null]}
                                    activeOpacity={0.9}
                                    onPress={() => { setShowOldPassword(!showOldPassword) }}
                                >
                                    <Entypo
                                        name={showOldPassword ? 'eye' : 'eye-with-line'}
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>New Password</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, error.password ? styles.error : null]}
                                    placeholder="**********"
                                    autoCapitalize="none"
                                    value={password}
                                    secureTextEntry={showPassword}
                                    onChangeText={(text) => { handleChange(text, 'password') }}
                                />
                                <TouchableOpacity
                                    style={[authStyles.inputIconContainer, error.password ? styles.error : null]}
                                    activeOpacity={0.9}
                                    onPress={() => { setShowPassword(!showPassword) }}
                                >
                                    <Entypo
                                        name={showPassword ? 'eye' : 'eye-with-line'}
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[authStyles.textInputContainer, { width: '100%' }]}>
                            <Text style={authStyles.labelText}>Confirm Password</Text>
                            <View style={authStyles.textInputIconContainer}>
                                <TextInput
                                    style={[authStyles.textInputWithRightIcon, error.confirmPassword ? styles.error : null]}
                                    placeholder="**********"
                                    autoCapitalize="none"
                                    secureTextEntry={showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={(text) => { handleChange(text, 'confirmPassword') }}
                                />
                                <TouchableOpacity
                                    style={[authStyles.inputIconContainer, error.confirmPassword ? styles.error : null]}
                                    activeOpacity={0.9}
                                    onPress={() => { setShowConfirmPassword(!showConfirmPassword) }}
                                >
                                    <Entypo
                                        name={showConfirmPassword ? 'eye' : 'eye-with-line'}
                                        size={15}
                                        color={Colors.borderLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Update"
                                onPress={() => { validate() }}
                            />
                        </View>
                    </View>
                    {/* form ended */}
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
    function handleChange(text, name) {
        setState({
            ...state,
            [name]: text
        })
    }
    function validate() {
        if (name === '') {
            handleError('name');
        }
        else if (oldPassword !== '' || password !== '' || confirmPassword !== '') {
            if (oldPassword === '')
                handleError('oldPassword');
            else if (password === '')
                handleError('password')
            else if (confirmPassword === '')
                handleError('confirmPassword')
            else if (password !== confirmPassword) {
                removeError();
                alert("Confirm Password doesn't matched");
            }
            else if (props.userDetails.password !== oldPassword) {
                removeError();
                alert("Old Password Doesn't matched");
            }
            else {
                updateDetails({ 'name': name });
                updatePasswordLocal(password);
            }
        }
        else {
            updateDetails({ 'name': name });
        }
    }

    async function updatePasswordLocal(password) {
        let id = await AsyncStorage.getItem('@id');
        id = +id;
        updatePassword(id, password).then(() => { }).catch((error) => { console.log(error) });
    }

    function updateDetails(body) {
        props.saveUserDetailsToRealm(body);
        navigation.goBack();
        alert("Details updated successfully!!");
    }

    function handleError(name) {
        setError({
            ...error,
            name: false,
            oldPassword: false,
            passowrd: false,
            confirmPassword: false,
            [name]: true
        });
    }
    function removeError() {
        setError({
            name: false,
            oldPassword: false,
            passowrd: false,
            confirmPassword: false,
        });
    }

    async function fetchDetails() {
        try {
            let id = await AsyncStorage.getItem('@id');
            id = +id;
            let details = await fetchUserDetails(id);
            setState({
                ...state,
                name: details.userDetails.name
            })
        }
        catch (e) {
            console.log("Something went wrong, while fetching the user details");
        }
    }
}

const mapStateToProps = () => state => ({
    userDetails: state.User.userDetails
})

const mapDispatchToProps = () => dispatch => ({
    saveUserDetailsToRealm: (name) => dispatch(saveUserDetailsToRealm(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    cameraContainer: {
        height: 50,
        width: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.borderLight,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        color: Colors.textDark
    },
    textInput: {
        height: '100%',
        width: '90%',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0,
        borderRightWidth: 0
    },
    error: {
        borderColor: Colors.danger
    },
    changePasswordText: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 10
    },
    buttonContainer: {
        width: '80%',
        marginTop: 10
    }
})