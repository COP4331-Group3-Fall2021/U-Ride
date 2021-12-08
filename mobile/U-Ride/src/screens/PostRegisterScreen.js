import React, { Component } from 'react';
import { StyleSheet, TextInput,  View, Text, Image, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Input, Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default function PostRegisterScreen({navigation}) {
    return (
      <View style={{ backgroundColor:'#ffffff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <View style = {styles.container}>
          <Image style= {{width: 100, height: 95, marginBottom: 25}} source = {{uri:  'https://lh3.googleusercontent.com/pw/AM-JKLUo4dsqU5BE9qNwz9GgidrqNVzaVluKFgl0mU0eTib2NFPa7q6lAclY0piw1dnyMEXppcFc_TpCvnTpRIQqar0oFUEQT_gRCOuTU0qwRQIkkTuQnhd7CcVKVY3lsVr4obAdS2jevMLdS3g0-fN2m5ju=w680-h439-no?authuser=0'}} />  
        </View>
        <View style={{alignItems: 'flex-end'}}>
       
        <View style={{ flexDirection:'column',textAlign: 'center'}}>
          <Text style={{fontSize:25, textAlignVertical: "center",textAlign: "center", paddingLeft:20, paddingRight:20,fontWeight:
                  'bold', color : '#003459'}}>Thank You for Registering</Text>
          <Text style={{fontSize:18, textAlignVertical: "center",textAlign: "center", marginTop: 10, paddingLeft:35, paddingRight:35}}>To search for and manage your carpools, please go to our website.</Text>
        </View>
        </View>

       

        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20, marginTop:30}}>
        <Button 
                title="View Site"
                buttonStyle={{backgroundColor:'#003459'}}
                onPress={() => Linking.openURL('https://u-ride-cop4331.herokuapp.com/')}
            /> 
        </View>
       
      </View>
    )
}