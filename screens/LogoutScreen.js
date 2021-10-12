import * as React from 'react';
import firebase from 'firebase';
import { Text,View,StyleSheet,Dimensions } from 'react-native';

export default class LogoutScreen extends React.Component{
    componentDidMount(){
        firebase.auth().signOut();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Logout</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        marginTop:Dimensions.get('window').height/2,
        alignSelf:'center'
    }
})