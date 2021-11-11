import React, { Component } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class Cardscreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#ff0000', flex: 1, alignItems: 'center', justifyContent: 
'center' }}>
        <View style={{alignItems: 'flex-end'}}>
        <View style={{ flexDirection:'row' }}>
          <Text style={{fontSize:20}}>Search Criteria: </Text>
          <TextInput
            style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
            placeholder="Search"
          />        
        </View>
        <Text style={{fontSize:20}}>Search Results Here{'\n'} </Text>
        <View style={{ flexDirection:'row' }}>
          <Text style={{fontSize:20}}>Card to Add: </Text>
          <TextInput
            style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
            placeholder="Card"
            secureTextEntry={true}
          />
        </View>
        <Text style={{fontSize:20}}>Message Here{'\n'} </Text>
        </View>
        <Button
          title="To Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}