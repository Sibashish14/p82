import * as React from 'react';
import { Text,Image,StyleSheet,View } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

export default class PostCard extends React.Component{
    constructor(){
        super();
        this.state={
            light_theme:true,
            post_id:this.props.post.key,
            post_data:this.props.post.value
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
        })
        this.setState({light_theme:theme==='light'?true:false})
    }
    render(){
        let posts=this.state.post_data;
     return(
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("PostScreen",{post:this.state.post})}}
      style={styles.container}>
           <View style={styles.cardContainer}>
               <View style={styles.personNameContainer}>
                   <Text>{this.props.posts.person}</Text>
               </View>
               <Image style={styles.image} source={require('../assets/profile_img.png')}/>
               <View styles={styles.captionContainer}>
                   <Text style={{fontSize:(RFValue(10))}}>{this.props.posts.caption}</Text>
               </View>
               <View styles={styles.captionContainer}>
                   <Text style={{fontSize:(RFValue(10))}}>{this.props.posts.description}</Text>
               </View>
               <View style={styles.likeContainer}>
                   <Ionicons name={"thumbs-up"} size={RFValue(30)} color={"#ffffff"}/>
                   <Text style={styles.likeText}>{this.props.posts.like}</Text>
               </View>
           </View>
        </TouchableOpacity>
    )
}}
const styles=StyleSheet.create({
   container:{
       margin:RFValue(10),
       flex:1
   },
   cardContainer:{
       margin:RFValue(10),
       backgroundColor:"gray",
       borderRadius:RFValue(20)
   },
   personNameContainer:{
       alignContent:'center',
       alignItems:'center',
       width:"95%",
       height:RFValue(10)
   },
   image:{
       resizeMode:'contain',
       width:"95%",
       height:RFValue(30),
       margin:RFValue(10)
   },
   captionContainer:{
       alignSelf:'center'
   },
   likeContainer:{
       width:"40%",
       height:RFValue(20),
       borderRadius:RFValue(20),
       backgroundColor:"red",
       alignSelf:'center',
       flexDirection:'row',
       alignItems:'center',
       alignContent:'center'
   }
})