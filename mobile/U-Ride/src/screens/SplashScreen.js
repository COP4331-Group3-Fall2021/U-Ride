import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

<link rel = 'Button' href = 'Button.css'></link>
export default class Homescreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{alignItems: 'flex-end'}}>
        <Image style= {{width: 300, height: 125, marginBottom: 5}} source = {{uri:  'https://lh3.googleusercontent.com/pw/AM-JKLUyTf3H8lbgugZbwJWx-qsuQdRz_wwh51omCd0joM-LF_WmmXWotnRmM3lQCmJ5_mLS6nhJDRklOoxXH77uXwpQKvLzizxDstwWhTB3gsTbFrROFSJCJlVAytu58ahbcun091XLUjXwxpln-T-x8mum=w343-h162-no?authuser=0'}} />  
     
        
        </View>

        <View style = {styles.container}>
          <Image style= {{width: 300, height:300}} source = {{uri:  'https://i.imgur.com/QLSNjfH.png'}} />  
        </View>


        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20}}>
          <Button 
            title="Log In"
            buttonStyle={{backgroundColor: '#003459', borderRadius: 15, height: 45}}
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20}}>
          <Button 
          
            title="Sign Up"
            buttonStyle={{backgroundColor: '#2E5C94', borderRadius: 15, height: 45}}
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </View>
    )
  }
}