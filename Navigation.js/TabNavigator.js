import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreatePostScreen from '../screens/CreatePost';
import FeedScreen from '../screens/Feed.js';
import {RFValue} from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class TabNavigator extends React.Component{
    constructor(){
        super();
        this.state={
            isUploaded:false,
            light_theme:true
        }
    }
    componentDidMount(){
        let themes;
        firebase
        .database()
        .ref("/users/"+firebase.auth().currentUser.uid)
        .on("value",function(snapshot){
            themes=snapshot.val().current_theme
        })
        this.setState({light_theme:themes==="light"?true:false})
    }
    renderPost=(props)=>{
     return <CreatePostScreen setUpdateToTrue={this.uploadUpdate} props={...props}/>;
    }
    renderFeed=(props)=>{
        return <FeedScreen setUpdateToFalse={this.removeUpdate} props={...props}/>;
    }
    uploadUpdate=()=>{
        this.state({isUploaded:true})
    }
    removeUpdate=()=>{
        this.setState({isUploaded:false})
    }
    render(){
        const Tab=createMaterialBottomTabNavigator();
        return(
            <Tab.Navigator
              label={false}
              barStyle={this.state.light_theme
                        ?styles.barStyleLight
                        :styles.barStyle}
             screenOptions={({route})=>({
              tabBarIcon:({focused,size,color})=>{
                   let iconName;
                   if(route.name==='Feed'){
                       iconName=focused?'book':'book-outline'
                   }
                   else if(route.name==='CreatePost'){
                       iconName=focused?'create':'create-outline'
                   }
                   return <Ionicons name={iconName} size={size} color={color} style={styles.icon}/>
              }
            })}
            tabBarOptions={{
                activeTintColor:'tomato',
                inactiveTintColor:'black'
            }}>
             <Tab.Screen name="Feed"
              component={FeedScreen}
              screenOptions={{unmountOnBlur:true}}/>
             <Tab.Screen name="CreatePost"
              component={CreatePostScreen}
              screenOptions={{unmountOnBlur:true}}/>
            </Tab.Navigator>
        )
    }
   
}
const styles=StyleSheet.create({
    barStyle:{
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      backgroundColor:'#2f345d',
      overflow:'hidden',
      position:'absolute'
    },
    barStyleLight:{
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'#eaeaea',
        overflow:'hidden',
        position:'absolute'
      },
    icon:{
      height:RFValue(30),
      width:RFValue(30)
    }
})