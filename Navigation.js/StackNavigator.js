import * as React from 'react';
import { Text,View  } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PostScreen from '../screens/PostScreen';
import TabNavigator from './TabNavigator';

const Stack=createStackNavigator();
export default class StackNavigator extends React.Component{
    render(){
        return(
            <Stack.Navigator initialRoutename="Tab" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Tab" component={TabNavigator}></Stack.Screen>
                <Stack.Screen name="Post" component={PostScreen}/>
            </Stack.Navigator>
        )
    }
}    