import React, { useState } from 'react';

//helper functions
import Helper from '../../common/consts/Helper';
import AsyncStorage from '@react-native-community/async-storage';

//api components
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';

//custom components
import Button from '../../common/components/Button';
import AuthHeader from '../../common/components/Auth/Header';

//styles
import styles from '../../common/styles/AuthStyles';

//realm actions
import { checkOfflineUser, updatePassword, saveAccessToken } from '../../realm/actions/UserActions';

//redux imports
import { connect } from 'react-redux';
import { appLogin } from '../../actions/AuthActions';

function SignupScreen(props) {

    //navigate function to navigate the things
    let { navigate } = props.navigation;

    //states
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    //errors
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })

    const [isLoading, setIsLoading] = useState(false);

    //handling the errors for the screen
    function handleError(name) {
        setErrors({
            ...errors,
            email: false,
            password: false,
            [name]: true
        });
    }

    //handling the change in input fields
    function handleChange(value, name) {
        setState({
            ...state,
            [name]: value
        });
    }

    //validations
    function submit() {
        let { email, password } = state;
        if (email === '') {
            handleError('email');
        }
        else if (password === '') {
            handleError('password');
        }
        else {
            setErrors({
                ...errors,
                email: false,
                password: false
            })
            signupNow();
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

    //signup hit
    function signupNow() {

        //setting loading flag
        setIsLoading(true);

        let { email, password } = state;

        //form data body
        let body = new FormData();

        //appending data to body
        body.append('email', email);
        body.append('password', password);

        let res = Helper('register', 'POST', body, true);
        res.then(async (data) => {
            if (data.access_token) {
                setIsLoading(false);
                try {
                    await AsyncStorage.setItem('@access_token', data.access_token)
                    await AsyncStorage.setItem('@username', email)
                    let userid = await getUserDetails();
                    await updatePassword(userid, password)
                    await saveAccessToken(userid, data.access_token)
                } catch (e) {
                    console.log("Error async", e)
                    //error while saving token
                }
                props.appLogin();

            }
            else {
                setIsLoading(false);
                alert(data.message);
            }
        })
            .catch((error) => {
                console.log(error, "error")
            })
    }

    return (
        <View>
            <ScrollView contentContainerStyle={[styles.container]}>
                <View>
                    {/* header */}
                    <AuthHeader />
                    <KeyboardAvoidingView enabled behavior="padding">
                        {/* form started */}
                        <View style={styles.formContainer}>
                            <View style={[styles.textInputContainer]}>
                                <Text style={styles.labelText}>Email</Text>
                                <TextInput
                                    style={[styles.textInput, errors.email ? styles.error : null]}
                                    placeholder="Enter email"
                                    autoCapitalize="none"
                                    value={state.email}
                                    onChangeText={(text) => { handleChange(text, 'email') }}
                                />
                            </View>
                            <View style={[styles.textInputContainer]}>
                                <Text style={[styles.labelText]}>Password</Text>
                                <TextInput
                                    style={[styles.textInput, errors.password ? styles.error : null]}
                                    placeholder="Enter Password"
                                    value={state.password}
                                    onChangeText={(text) => { handleChange(text, 'password') }}
                                    secureTextEntry
                                />
                            </View>
                            <View style={[styles.buttonContainer]}>
                                <Button
                                    title="Register"
                                    onPress={submit}
                                    loading={isLoading}
                                />
                            </View>
                        </View>
                        {/* form ended */}
                    </KeyboardAvoidingView>

                    {/* terms and conditions  */}
                    <View style={[styles.signupText]}>
                        <Text style={[styles.labelText]}>By registering you agree to the</Text>
                        <TouchableOpacity
                            onPress={() => { navigate('TermsConditionsScreen') }}
                        >
                            <Text style={[styles.signup]}>Terms of use</Text>
                        </TouchableOpacity>
                    </View>
                    {/* terms and conditions ended */}

                    {/* already have account container*/}
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.signupText]}>
                            <Text style={[styles.labelText]}>Already have an account?</Text>
                            <TouchableOpacity
                                onPress={() => { navigate('LoginScreen') }}
                            >
                                <Text style={[styles.signup]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* alerady have accout container ended */}
                </View>
            </ScrollView>
        </View>
    )
}

const mapDispatchToProps = () => dispatch => ({
    appLogin: () => dispatch(appLogin())
})

export default connect(null, mapDispatchToProps)(SignupScreen);