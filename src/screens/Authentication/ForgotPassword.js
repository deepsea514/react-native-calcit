import React from 'react';

//api components
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';

//custom components
import AuthHeader from '../../common/components/Auth/Header';
import Button from '../../common/components/Button';

//styles
import styles from '../../common/styles/AuthStyles';

export default function ForgotPasswordScreen(props) {

    //navigate function helps to navigate to other screens
    let { navigate } = props.navigation;

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    {/* header */}
                    <AuthHeader />

                    <KeyboardAvoidingView enabled behavior="padding">
                        {/* form started */}
                        <View style={[styles.formContainer]}>
                            <View style={[styles.textInputContainer]}>
                                <Text style={styles.labelText}>Email</Text>
                                <TextInput
                                    style={[styles.textInput]}
                                    placeholder="example@gmail.com"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Submit"
                                />
                            </View>
                        </View>
                        {/* form ended */}
                    </KeyboardAvoidingView>

                    {/* go back container */}
                    <View style={[styles.signupContainer]}>
                        <View style={[styles.signupText]}>
                            <Text style={[styles.labelText]}>Nevermind</Text>
                            <TouchableOpacity
                                onPress={() => { navigate('LoginScreen') }}
                            >
                                <Text style={styles.signup}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* go back ended */}
                </View>
            </ScrollView>
        </View>
    )
}