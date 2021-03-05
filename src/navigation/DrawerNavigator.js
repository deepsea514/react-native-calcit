import React from 'react';

//navigation imports
import { createDrawerNavigator } from '@react-navigation/drawer';

//screens
import Dashboard from '../screens/Application/Dashboard';
import Setting from '../screens/Application/Setting';

//custom drawer component
import CustomDrawer from '../common/components/App/Drawer';

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            headerMode={false}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >

            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Settings" component={Setting} options={{unmountOnBlur:true}}/>
        </Drawer.Navigator>
    )
}