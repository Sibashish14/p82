import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile';
import LogoutScreen from '../screens/LogoutScreen';
import CustomSidebarMenu from '../screens/CustomSidebarMenu';
import firebase from 'firebase';

export default class DrawerNavigator extends React.Component{
    constructor(){
        super();
        this.state={
            light_theme:true
        }
    }
    componentDidMount(){
      let theme;
       firebase
        .database()
        .ref("/users/",firebase.auth().currentUser.uid)
        .on("value",snapshot=>{
           theme=snapshot.val().current_theme;
        });
        this.setState({light_theme:theme==="light"?true:false});
    }
    render(){
        const Drawer=createDrawerNavigator();
        return(
            <Drawer.Navigator
               drawerContentOptions={{
                   activeTintColor:'#e91e63',
                   inactiveTintColor:this.state.light_theme?"white":"black",
                   itemStyle:{marginVertical:10}
               }}
               drawerContent={props=><CustomSidebarMenu {...props}/>}
            >
                <Drawer.Screen 
                name="Home" 
                component={TabNavigator}
                screenOptions={{unmountOnBlur:true}}
                />
                <Drawer.Screen name="Profile" 
                component={ProfileScreen}
                screenOptions={{unOnmountBlur:true}}/>
                <Stack.Screen 
                 name="Logout"
                 component={LogoutScreen}
                 screenOptions={{unOnmountBlur:true}}/>
            </Drawer.Navigator>
        )
    }
}