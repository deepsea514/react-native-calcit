import React, { useEffect } from 'react';

//react-native-components
import { StatusBar } from 'react-native';

//navigation imports
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

//redux imports
import { Provider } from 'react-redux';
import store from './src/store';

//App navigator 
import AppNavigator from './src/navigation/AppNavigator';
// the above navigator contains the 
//whole navigation login for the application

//splash screen 
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  //hiding the splash screen when app.js is loaded
  useEffect(() => {
    //hide function hides 
    //the splash screen when app.js is loaded
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}