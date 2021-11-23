import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, View, Text, Image, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default class PostRegisterScreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#a89dd2', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{alignItems: 'flex-end'}}>
        <View style={{ flexDirection:'column',textAlign: 'center'}}>
          <Text style={{fontSize:40, textAlignVertical: "center",textAlign: "center"}}>Thank You for Registering.</Text>
          <Text style={{fontSize:20, textAlignVertical: "center",textAlign: "center"}}>To search for and manage your carpools, please login to our website at the link below:  </Text>
     
        </View>
        </View>

        <View style = {{width: 200, height: 40}}>

            <Button 
                title="Website"
                color = '#ed7a7a'
                onPress={() => Linking.openURL('https://u-ride-cop4331.herokuapp.com/')}
            />     
        </View>
       
      </View>
    )
  }
}