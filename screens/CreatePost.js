import * as React from 'react';
import {Text,View,StatusBar,Image,TextInput,Platform,StyleSheet,SafeAreaView,ScrollView,Alert,ToastAndroid} 
from "react-native";
import  {RFValue} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

export default class CreatePostScreen extends React.Component{
   constructor(){
       super();
       this.state={
           previewImage:"image_1",
           dropdownHeight:60,
           open:false,
           light_theme:true
       }
   }
   componentDidMount(){
       this.fetchUser();
   }
   fetchUser=()=>{
       let theme;
       firebase
       .database()
       .ref('/users/',firebase.auth().currentUser.uid)
       .on('value',snapshot=>{
           theme=snapshot.val().current_theme
       });
       this.setState({light_theme:theme==='light'?true:false});
   }
   async submitStory(){
       if(this.state.caption&&this.state.decription){
           let postData={
               description:this.state.description,
               created_on:new Date(),
               caption:this.state.caption,
               person:this.state.person,
               preview_image:this.state.preview_imagem,
               like:0
            }
            await firebase
            .database()
            .ref("/posts/",Math.round()
            .toString(36)
            .slice(2)
            )
            .set(postData)
            .then((snapshot)=>{});
            this.props.setUpdtateToTrue();
            this.props.navigation.navigate("Feed");
    ToastAndroid.showWithGravityAndOffset("Successfully Submitted",ToastAndroid.SHORT,20,50,60);
       }else{
           Alert.alert(
               "Error",
               "Enter all the fields",
               [{
                   text:"OK",
                   onPress=()=>null
               }],
               {cancelable:true}
           );
       }
   }
   render(){

       let preview_images={
           image_1:require('../assets/image_1.jpg'),
           image_2:require('../assets/image_2.jpg'),
           image_3:require('../assets/image_3.jpg'),
           image_4:require('../assets/image_4.jpg'),
           image_5:require('../assets/image_5.jpg'),
           image_6:require('../assets/image_6.jpg'),
           image_7:require('../assets/image_7.jpg')
       }

       return(
         <View style={
             this.state.light_theme
             ?styles.containerLight
            :styles.container}>
           <SafeAreaView style={styles.droidSafeArea}/>
             <View style={
                 this.state.lightTheme
                 ?styles.appTitleLight
                 :styles.appTitle}>
                 <View style={styles.appIcon}>
                     <Image source={require('../assets/logo.png')} style={styles.iconImage}/>
                 </View>
                 <View style={styles.appTitleTextContainer}>
                     <Text style={styles.appTitleText}>New Post</Text>
                 </View>
                 <View style={styles.fieldsContainer}>
                     <ScrollView>
                     <Image style={styles.previewImage} source={preview_images[this.state.previewImage]}/>
                     <View style={{height:RFValue(this.state.dropdownHeight)}}>
                         <DropDownPicker
                          items={[
                            {label:"Image 1",value:"image_1"},
                            {label:"Image 2",value:"image_2"},
                            {label:"Image 3",value:"image_3"},
                            {label:"Image 4",value:"image_4"},
                            {label:"Image 5",value:"image_5"},
                            {label:"Image 6",value:"image_6"},
                            {label:"Image 7",value:"image_7"}
                          ]}
                          defaultValue={this.state.previewImage}
                          open={this.state.open}
                          onOpen={()=>{
                          this.setState({
                              open:true,
                              dropdownHeight:200
                          })}}
                          onClose={()=>{
                             this.setState({
                                 open:false,
                                 dropdownHeight:60
                             }) 
                            }}
                            containerStyle={{
                                borderRadius:40,
                                height:20,
                                marginBottom:10
                            }}
                            style={{backgroundColor:'transparent'}}
                            dropDownStyle={{backgroundColor:this.state.light_theme===true?'white':'#2a2a2a'}}
                            labelStyle={{color:this.state.light_theme===true?'black':'white'}}
                            arrowStyle={{color:this.state.light_theme===true?'white':'black'}}
                            itemStyle={{justifyContent:'center'}}
                            onChangeItem={item=>{
                                this.setState({previewImage:item.value})
                            }}/>
                     </View>
                     <TextInput 
                         placeholder="caption"
                         placeholderTextColor={this.state.light_theme===true?'black':'white'}
                         style={
                             this.state.light_theme
                             ?styles.inputFontLight
                             :styles.inputFont}
                         multiline={true}
                         numberOfLines={10}
                         onChangeText={caption=>{this.setState({caption})}}
                    />
                    <TextInput 
                         placeholder="caption"
                         placeholderTextColor={this.state.light_theme===true?'black':'white'}
                         style={
                             this.state.light_theme
                             ?styles.inputFontLight
                             :styles.inputFont}
                         multiline={true}
                         numberOfLines={2}
                         onChangeText={description=>{this.setState({description})}}
                    />
            <TouchableOpacity onPress={()=>{this.submitStory()}}
            style={{margin:RFValue(35),width:RFValue(100),alignSelf:'center',
            alignContent:'center',alignItems:'center',borderWidth:RFValue(10),
            borderColor:this.state.light_theme?"black":"white"
                    }}>
                        <Text style={{color:this.state.light_theme?"black":"white"}}>Submit</Text>
                    </TouchableOpacity>
                    </ScrollView>
                 </View>
             </View>
             <View style={{flex:0.02}}/>
         </View>
       )
   }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#000'
    },
    containerLight:{
        flex:1,
       backgroundColor:'#ffffff'
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    appTitle:{
       flex:0.07,
       flexDirection:"row",
       color:'white'
    },
    appTitleLight:{
        flex:0.07,
        flexDirection:"row",
        color:'black'
     },
    appIcon:{
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    iconImage:{
        width:"100%",
        height:"100%",
        resizeMode:'contain'
    },
    appTitleTextContainer:{
        flex:0.7,
        justifyContent:'center'
    },
    appTitleText:{
        color:'white',
        fontSize:RFValue(28)
    },
    fieldsContainer:{
        flex:0.85
    },
    previewImage:{
        width:"93%",
        height:RFValue(250),
        resizeMode:'contain',
        borderRadius:RFValue(10),
        alignSelf:'center',
        marginVertical:RFValue(10)
    },
   
    inputFont:{
        height:RFValue(40),
        borderColor:"white",
        borderWidth:RFValue(1),
        borderRadius:RFValue(10),
        color:"white",
        paddingLeft:RFValue(10)
    },
    inputFontLight:{
        height:RFValue(40),
        borderColor:"black",
        borderWidth:RFValue(1),
        borderRadius:RFValue(10),
        color:"black",
        paddingLeft:RFValue(10)
    }
})