import * as React from 'react';
import { Text,View,StyleSheet,Image,SafeAreaView,Platform,StatusBar,ScrollView} 
from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default class PostScreen extends React.Component{
    constructor(){
        super();
        this.state={
            light_theme:true
        }
    }
    componentDidMount(){
        this.fetchUser();
    }
    fetchUser=()=>{
        let theme;
        await firebase
        .database()
        .ref('/users/',firebase.auth().currentUser.uid)
        .on('value',snapshot=>{
            theme=snapshot.val().current_theme
        })
        this.setState({light_theme:theme==='light'?true:false})
    }
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image style={styles.imageIcon} source={require('../assets/logo.png')}/>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>See Post</Text>
                    </View>
                </View>
                <View style={styles.postContainer}>
                    <ScrollView style={styles.postCard}>
                    <Image style={styles.image} source={require('../assets/image_1.jpg')}/>
                        <View style={styles.titleTextContainer}>
                            <Text style={styles.postTitleText}>{this.props.route.params.post.person}</Text>
                        </View>
                        <Image source={require('../assets/post.jpeg')} style={styles.image}/>
                        <View style={style.captionContainer}>
                            <Text style={{fontSize:RFValue(30)}}>{this.props.route.params.post.caption}</Text>
                        </View>
                        <View style={style.likeTextContainer}>
                            <Text style={styles.titleText}>{this.props.route.params.post.like}</Text>
                    <Ionicons color={"white"} name={"heart"} size={RFValue(35)} style={styles.icons}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
    },
    appTitle:{
        flex:0.07,
        flexDirectiion:'row'
    },
    appIcon:{
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    imageIcon:{
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
    postContainer:{
        flexDirection:'column',
        padding:RFValue(20)
    },
    postCard:{
        margin:RFValue(20),
        borderRadius:RFValue(20),
        backgroundColor:'#2f345d'
    },
    image:{
        width:"100%",
        height:"100%",
        resizeMode:"contain"
    },
    captionContainer:{
        marginTop:RFValue(30),
        marginBottom:RFValue(30),
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    likeTextContainer:{
        width:RFValue(160),
        height:RFValue(40),
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:RFValue(30),
        backgroundColor:'#eb3948',
        margin:RFValue(10)
    },
    likeText:{
      color:'white',
      fontSize:RFValue(20),
      marginLeft:RFValue(5)
    },
    icon:{
        width:"100%",
        height:"100%",
        resizeMode:'contain'
    }
})