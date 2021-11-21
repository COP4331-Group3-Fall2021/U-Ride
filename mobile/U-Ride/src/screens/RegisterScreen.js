import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default class RegisterScreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#a89dd2', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{alignItems: 'flex-end'}}>
        <View style={{ flexDirection:'column' }}>
          <Text style={{fontSize:40}}>     U-ride </Text>
          <Text style={{fontSize:20}}>Eco and wallet friendly </Text>    
        </View>

     
        
        </View>

        <View style = {styles.container}>
          <Image style= {{width: 200, height:200}} source = {{uri:  'https://i.imgur.com/QLSNjfH.png'}} />  
        </View>

        <View style = {{width: 200, height: 40}}>
          <TextInput
            style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
            placeholder="Username"
          />     
        </View>

        <View style = {{width: 200, height: 40}}>
          <TextInput
            style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
            placeholder="Password"
          />   
        </View>

        <View style = {{width: 200, height: 40}}>
          <TextInput
            style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
            placeholder="Confirm Password"
          />   
        </View>
        

        <View style = {{width: 200, height: 40}}>
          <Button 
            title="Register"
            color = '#ed7a7a'
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
        <View style = {{width: 200, height: 40}}>
          <Button 
            title="Go back"
            color = '#ed7a7a'
            onPress={() => this.props.navigation.navigate('Splash')}
          />
        </View>
      </View>
    )
  }
}