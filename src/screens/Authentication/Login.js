import React, { useState, useEffect } from 'react';

//helper functions
import Helper from '../../common/consts/Helper';
import AsyncStorage from '@react-native-community/async-storage';

//api components
import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

//custom components
import AskSessionModal from '../../common/components/Auth/AskSessionModal';
import AuthHeader from '../../common/components/Auth/Header';
import Button from '../../common/components/Button';

//styles 
import styles from '../../common/styles/AuthStyles';

//redux imports
import { connect } from 'react-redux';
import { appLogin, appLogout } from '../../actions/AuthActions';
import { saveUserDetailsToRealm } from '../../actions/UserActions';
import { updatePassword, checkOfflineUser, saveAccessToken } from '../../realm/actions/UserActions';

function LoginScreen(props) {

    //modal state
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => { getPreviousSession() }, [])
    async function getPreviousSession() {
        let token = await AsyncStorage.getItem('@access_token')
        if (token) {
            //ask for previous session
            setModalVisible(true)
        };
    }

    //function to navigate to other screens
    let { navigate } = props.navigation;

    //form states
    const [state, setState] = useState({
        username: '',
        password: '',
        toggleCheckBox: false
    });

    //loading flag
    const [isLoading, setIsLoading] = useState(false);

    //errors for this form
    const [errors, setErrors] = useState({
        username: false,
        password: false
    })

    //set texts to state
    function handleChange(value, name) {
        setState({
            ...state, //previous state
            [name]: value //setting current value
        })
    }

    //handling the errors for the screen
    function handleError(name) {
        setErrors({
            ...errors,
            username: false,
            password: false,
            [name]: true
        });
    }

    //validations
    function submit() {
        let { username, password } = state;
        if (username === '') {
            handleError('username');
        }
        else if (password === '') {
            handleError('password');
        }
        else {
            setErrors({ username: false, password: false })
            loginNow();
        }
    }
    async function getUserDetails() {
        let id = 0;
        let res = await Helper('user', 'GET');
        if (res.status === 'success') {
            id = res.data.id;
            await AsyncStorage.setItem('@id', id.toString())
            return id;
        }

    }
    //submit login details to api
    function loginNow() {
        //getting the states
        let { username, password } = state;

        checkOfflineUser(username, password).then(async (authentication) => {
            if (authentication.userFound && authentication.authenticated) {
                // props.saveUserDetailsToRealm({ password: password })
                try {
                    await AsyncStorage.setItem('@username', username)
                    await AsyncStorage.setItem('@access_token', authentication.access_token);
                    await AsyncStorage.setItem('@id', authentication.id.toString());
                } catch (e) {
                    console.log("Error async", e)
                    //error while saving token
                }
                props.appLogin();
            }
            else if (authentication.userFound) {
                //wrong password 
                alert("Wrong Password!!");
            }
            else {
                //hit the api
                //setting the loading flag
                setIsLoading(true);

                //form data body
                let body = new FormData();

                //appending data to body
                body.append('username', username);
                body.append('password', password);

                //hitting the api
                let res = Helper('login', 'POST', body, true);

                // getting data
                res.then(async (data) => {
                    if (data && data.access_token) {
                        // props.saveUserDetailsToRealm({ password: password })
                        try {
                            await AsyncStorage.setItem('@access_token', data.access_token)
                            await AsyncStorage.setItem('@username', username)
                            let userid = await getUserDetails();
                            await updatePassword(userid, password)
                            await saveAccessToken(userid, data.access_token)
                        } catch (e) {
                            console.log("Error async", e)
                            //error while saving token
                        }
                        setIsLoading(false);
                        props.appLogin();
                    }
                    else {
                        setIsLoading(false);
                        alert("Wrong Password!!");
                    }
                })
                    .catch((error) => {
                        console.log(error, "error")
                    })
            }
        })


    }
    return (
        <View>
            <ScrollView contentContainerStyle={[styles.container]}>
                <View>
                    {/* header */}
                    <AuthHeader />

                    <KeyboardAvoidingView enabled behavior="padding">
                        {/* form started*/}
                        <View style={[styles.formContainer]}>
                            <View style={[styles.textInputContainer]}>
                                <Text style={styles.labelText}>Email</Text>
                                <TextInput
                                    style={[styles.textInput, errors.username ? styles.error : null]}
                                    placeholder="example@gmail.com"
                                    autoCapitalize="none"
                                    onChangeText={(text) => { handleChange(text, 'username') }}
                                    value={state.username}
                                />
                            </View>
                            <View style={[styles.textInputContainer]}>
                                <Text style={[styles.labelText]}>Password</Text>
                                <TextInput
                                    style={[styles.textInput, errors.password ? styles.error : null]}
                                    placeholder="******"
                                    secureTextEntry
                                    onChangeText={(text) => { handleChange(text, 'password') }}
                                    value={state.password}
                                />
                            </View>
                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.checkboxContainer]}>
                                    <CheckBox
                                        disabled={false}
                                        value={state.toggleCheckBox}
                                        onValueChange={(newValue) => handleChange(newValue, 'toggleCheckBox')}
                                        animationDuration={0.1}
                                        boxType="square"
                                        style={styles.checkbox}
                                    />
                                    <Text style={[styles.labelText, { marginLeft: 10 }]}>Remember me</Text>
                                </View>
                            </View>
                            <View style={[styles.buttonContainer]}>
                                <Button
                                    title='Login'
                                    onPress={submit}
                                    loading={isLoading}
                                />
                            </View>
                        </View>
                        {/* form ended */}
                    </KeyboardAvoidingView>

                    {/* forgot password container */}
                    <TouchableOpacity
                        onPress={() => { navigate('ForgotPasswordScreen') }}
                    >
                        <View style={[styles.forgotPasswordContainer]}>
                            <View>
                                {/* icon is placed here */}
                                <Text style={[styles.labelText]}>Forgot your password?</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* forgot password ended */}

                    {/* signup container */}
                    <View style={[styles.signupContainer]}>
                        <View style={[styles.signupText]}>
                            <Text style={[styles.labelText]}>Do you have an account?</Text>
                            <TouchableOpacity
                                onPress={() => { navigate('SignupScreen') }}
                            >
                                <Text style={styles.signup}>Signup now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* signup ended */}
                </View>
            </ScrollView>
            <AskSessionModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                appLogin={props.appLogin}
            />
        </View>
    )
}

const mapDispatchToProps = () => dispatch => ({
    appLogin: () => dispatch(appLogin()),
    appLogout: () => dispatch(appLogout()),
    saveUserDetailsToRealm: (name) => dispatch(saveUserDetailsToRealm(name))
})

export default connect(null, mapDispatchToProps)(LoginScreen);