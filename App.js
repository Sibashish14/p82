import * as React from 'react';
import {View} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import firebase from 'firebase';
import { firebaseConfig } from './config';

export default class App extends React.Component{
    render(){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }else{
            firebase.app();
        }
        return(
            <View>
                <AppContainer/>
            </View>
        )
    }
}

const TabNavigator=createSwitchNavigator({
    LoadingScreen:LoadingScreen,
    LoginScreen:LoginScreen,
    DashboardScreen:DashboardScreen
})

const AppContainer=createAppContainer(TabNavigator);