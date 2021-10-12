import * as React from 'react';
import {Text,View,StyleSheet,SafeAreaView} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class CustomSidebarMenu extends React.Component{
    constructor(){
        super();
        this.state={
            light_theme:false
        }
    }
    componentDidMount(){
        let theme;
        firebase
        .database()
        .ref("/users/"+firebase.auth().currentUser.uid)
        .on("value",(data)=>{
            theme=data.val().current_theme
        });
        this.setState({light_theme:theme==="light"?true:false});
    }
    render(){
        let props=this.props;
        return(
        <View
           style={{
               flex:1,backgroundColor:this.state.light_theme?"white":"#15193c"
           }}>
            <SafeAreaView/>
             <Image  
               source={require('../assets/logo.png')}
               style={styles.sideBarMenuIcon}/>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
        )
    }
}
const styles=StyleSheet.create({
    sideBarMenuIcon:{
        width:RFValue(140),
        height:RFValue(140),
        alignSelf:'center',
        marginTop:RFValue(60),
        borderRadius:RFValue(70)
    }
})