import * as React from 'react';
import { Text,View,StyleSheet,Image,Switch,Dimensions,SafeAreaView,StatusBar,Platform } from 'react-native';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';

export default class ProfileScreen extends React.Component{
    constructor(){
        super();
        this.state={
          isEnabled:false,
          light_theme:true,
          profile_image:'',
          name:''
        }
    }
    toggleSwitch=()=>{
        const new_state=!this.state.isEnabled;
        const themes=new_state?'dark':'light';
        var updates={}
        updates[
            "/users/"+firebase.auth().currentUser.uid+"/current_theme"
        ]=themes;
        firebase
        .database()
        .ref()
        .updates(updates);
        
        this.setState({isEnabled:new_state,light_theme:!new_state});
    }
    componentDidMount(){
        this.fetchUser();
    }
    async fetchUser(){
        let theme,name,image;
        await firebase
         .database()
         .ref('/users/'+firebase.auth().currentUser.uid)
         .on('value',function(data){
             theme=data.val().current_theme;
             image=data.val().profile_picture;
             name=`${data.val().first_name}${data.val().last_name}`
         }) 
         this.setState({
            isEnabled:theme==='light'?false:true,
            light_theme:theme==='light'?true:false,
            name:name,
            profile_image:image
         })      
    }
    
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image source={require('../assets/logo.png')} style={styles.iconImage}/>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.screenContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image source={{uri:this.state.profile_image}}
                           style={styles.profileImage}/>
                            <Text style={styles.nameText}>{this.state.name}</Text>
                    </View>
                    <View style={styles.themeContainer}>
                        <Text style={styles.themeText}>Dark Theme</Text>
                        <Switch
                          style={{
                              transform:[{scaleX:1.3},{scaleY:1.3}]
                          }}
                          trackColor={{true:'#767577',false:'white'}}
                          thumbColor={this.state.isEnabled?'#ee8249':'#f4f3f4'}
                          onValueChange={()=>this.toggleSwitch()}
                          value={this.state.isEnabled}/>
                    </View>
                    <View style={{flex:0.03}}/>
                </View>
                <View style={{flex:0.8}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
    },
    screenContainer: {
      flex: 0.85
    },
    profileImageContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    profileImage: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70)
    },
    nameText: {
      color: "white",
      fontSize: RFValue(40),
      marginTop: RFValue(10)
    },
    themeContainer: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: RFValue(20)
    },
    themeText: {
      color: "white",
      fontSize: RFValue(30),
      marginRight: RFValue(15)
    }
  });