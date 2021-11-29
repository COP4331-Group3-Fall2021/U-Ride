import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Input, Button } from 'react-native-elements';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: '#FFFFFF'
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 3,
    elevation: 4,
  },
 textWindow:
 {
  alignItems:'center',
  width: 500, 
  height: 80
 }
});

export default function LoginScreen({navigation}) {
  // Stores the inputs
  const [loginCreds, setLoginCreds] = new useState({
    email:"",
    password:""
  });
 
// Validates a string
function validateInput (input) {
  if (input === undefined || input === "") {
      return false;
  }
  else {
      // Valid input
      return true;
  }
}
  // TODO: Add Error Messages to Login Modal
  function setMessage(message)
  {
    // Do something with the message here
  }
    
    // Allows Login to Occur
    function doLogin()
  {
   /* Check for the following input errors:
            - Invalid email (already covered by HTML5 form)
            - Blank email field
            - Blank password field
        */
        // Validate input fields
        // if (!validateInput(loginCreds.email) || !validateInput(loginCreds.password)) {
          setMessage('Missing a field.');

      // TODO
      // In Front End this code helped with validation. There is no document in mobile,
      // so the following statement will need to be revised
      //     if (!validateInput(loginCreds.email)) {
      //         // Draw red border on input field
              
      //         // document.getElementById("loginEmail").classList.add('input-invalid');
      //     } else {
      //         document.getElementById("loginEmail").classList.remove('input-invalid');
      //     }
      //     if (!validateInput(loginCreds.password)) {
      //         // Draw red border on input field
      //         document.getElementById("loginPassword").classList.add('input-invalid');
      //     } else {
      //         document.getElementById("loginPassword").classList.remove('input-invalid');
      //     }
      //     return;
      // } else {
      //     // Passed validation
      //     document.getElementById("loginEmail").classList.remove('input-invalid');
      //     document.getElementById("loginPassword").classList.remove('input-invalid');
      //     setMessage('');
      // }
      
      
      // TODO: Remove when Frontend removes the hashed login / Register
      // var hash = sha256(loginCreds.password);
      
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var requestBody = JSON.stringify({
         email: loginCreds.email,
         password: loginCreds.password
      });
      var requestOptions = {
          method: 'POST',
          headers: headers,
          body: requestBody,
          redirect: 'follow'
      };

      // Send Login API request and handle server response
     
      fetch('https://u-ride-cop4331.herokuapp.com/auth/login', requestOptions)
          .then(response => response.text())
          .then(result => {
            
              // Handle error messages
              if (result === 'EMAIL_NOT_FOUND') {
                  setMessage('Account does not exist.');
              }
              else if (result === 'INVALID_PASSWORD') {
                  setMessage('Invalid login.');
              }
              else if (result === 'INVALID_EMAIL') {
                setMessage('Invalid login.');
            }
              else if(result === 'Verification Email Resent')
              {
                  setMessage("Verify your email.");
              }
              else if(result === "TOO_MANY_ATTEMPTS_TRY_LATER")
              {
                  setMessage("Google says: f*** you.");
              }
              // Handle success
              else {
                  
                  let responseBody = JSON.parse(result);

                  
                  let userInfo = {firstName:responseBody.name.firstName, lastName:responseBody.name.lastName, userID:responseBody._id}
                  setMessage('');

                  
                  // Set user info into local storage
                  // localStorage.setItem('user_data', JSON.stringify(userInfo));

                  console.log("Login Sucessful");

                  navigation.navigate('Map');
                  
                  // Navigate to map
              }
          })
          .catch(error => console.error('error', error)); 
  }
    return (
      <View style={{ backgroundColor:'#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{alignItems: 'flex-end'}}>

        </View>

        <View style = {styles.container}>
          <Image style= {{width: 200, height: 200, marginBottom: 25}} source = {{uri:  'https://cdn.discordapp.com/attachments/900191961200349214/914677832725168178/logo3.png'}} />  
        </View>

        <Text style={{color: 'red', fontSize:20, fontWeight:'bold', marginBottom:10 }}> Error Message Here :) </Text>

    
          <Input
          containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Email"
            onChange={(e) => 
                setLoginCreds({...loginCreds, email:e.nativeEvent.text})}
          />     
  

      
          <Input
            containerStyle={{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Password"
            onChange={(e) => setLoginCreds({...loginCreds, password:e.nativeEvent.text})}
          />   
   
        

        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20}}>
          <Button 
            title="Log In"
            buttonStyle={{backgroundColor: '#003459'}}
            onPress={() => doLogin()}
          />
        </View>

        <View style = {{width:'75%', maxWidth:500, marginBottom:10, borderRadius: 20}}>
          <Button 
            buttonStyle={{color:'#003459'}}
            title="Create An Account"
            type = 'clear'
            onPress={() => doLogin()}
          />
        </View>

      </View>
    )
  }