import React from 'react';

//navigation imports
import { createStackNavigator } from '@react-navigation/stack';

//stack
const Stack = createStackNavigator();

//screens
import LoginScreen from '../screens/Authentication/Login';
import SignupScreen from '../screens/Authentication/Signup';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPassword';
import TermsAndConditionsScreen from '../screens/Authentication/TermsConditions';

export default function AuthStack() {
    return (
        <Stack.Navigator
            headerMode={false}
            initialRouteName="LoginScreen"
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="TermsConditionsScreen" component={TermsAndConditionsScreen} />
        </Stack.Navigator>
    )
}