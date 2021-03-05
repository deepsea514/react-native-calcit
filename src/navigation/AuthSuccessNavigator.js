import React from 'react';

//navigation imports
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

//stack screens
import MyProfile from '../screens/Application/MyProfile';
import NewProject from '../screens/Application/NewProject';
import Project from '../screens/Application/Project';

//stack
const Stack = createStackNavigator();

export default function ApplicationNavigator() {
    return (
        <Stack.Navigator
            headerMode={false}
            initialRouteName="Drawer"
        >
            <Stack.Screen 
                name="Project" 
                component={Project} 
                options={{
                    gestureEnabled: false
                }}
            />
            <Stack.Screen name="NewProject" component={NewProject} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
        </Stack.Navigator>
    )
}