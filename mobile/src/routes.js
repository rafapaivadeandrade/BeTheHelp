import {createStackNavigator}from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';
const  AppStack = createStackNavigator();

import Incidents from '../src/pages/Incidents';
import Detail from '../src/pages/Detail';

export default function Routes(){
    return (
        // <View></View>
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name = "Incidents"component ={Incidents}/>
                <AppStack.Screen  name="Detail"  component ={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}