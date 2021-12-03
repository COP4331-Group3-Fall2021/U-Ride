import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Input, Button } from 'react-native-elements';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: '#FFFFFF'
  },
});

export default function LoginScreen({navigation}) {
  // Stores the inputs
  const [loginCreds, setLoginCreds] = new useState({
    email:"",
    password:""
  });

  const [error, setError] = new useState("");
 
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
   setError(message);
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
        if (loginCreds.email === null || loginCreds.email === undefined)
        {
          setMessage('Missing a field.');
          return;
        } 
        if (loginCreds.password === null || loginCreds.password === undefined)
        {
          setMessage('Missing a field.');
          return;
        } 
        
       

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
                  setMessage("Too many attempts, please try again later.");
              }
              // Handle success
              else {
                  let responseBody = JSON.parse(result);

                  let userInfo = {firstName: responseBody.name.firstName, lastName: responseBody.name.lastName, userID: responseBody._id}
                  setError("");

                  // Set user info into local storage
                  AsyncStorage.setItem('user_data', JSON.stringify(userInfo)).then(() => {
                    // log
                    console.log("Login Sucessful");

                    // Navigate to map
                    navigation.navigate('Map');
                  }).catch(error => console.warn('remove this', error));
              }
          })
          .catch(error => console.error('error', error)); 
  }
    return (
      <View style={{ backgroundColor:'#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={{alignItems: 'flex-end'}}>

        </View>

        <View style = {styles.container}>
          <Image style= {{width: 150, height: 125, marginBottom: 25}} source = {{uri:  'https://lh3.googleusercontent.com/pw/AM-JKLUo4dsqU5BE9qNwz9GgidrqNVzaVluKFgl0mU0eTib2NFPa7q6lAclY0piw1dnyMEXppcFc_TpCvnTpRIQqar0oFUEQT_gRCOuTU0qwRQIkkTuQnhd7CcVKVY3lsVr4obAdS2jevMLdS3g0-fN2m5ju=w680-h439-no?authuser=0'}} />  
        </View>

        <Text style={{color: 'red', fontSize:20, fontWeight:'bold', marginBottom:10 }}> {error} </Text>

    
          <Input
          containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Email"
            onChange={(e) => 
                setLoginCreds({...loginCreds, email:e.nativeEvent.text})}
          />     
  

      
          <Input
            containerStyle={{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Password"
            secureTextEntry={true}
            onChange={(e) => setLoginCreds({...loginCreds, password:e.nativeEvent.text})}
          />   
   
        

        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20}}>
          <Button 
            title="Log In"
            buttonStyle={{backgroundColor: '#003459', borderRadius: 15, height: 45}}
            onPress={() => doLogin()}
          />
        </View>

        <View style = {{width:'75%', maxWidth:500, marginBottom:10, borderRadius: 20}}>
          <Button 
            buttonStyle={{color:'#003459', borderRadius: 15, height: 45}}
            title="Create An Account"
            type = 'clear'
            onPress={() => navigation.navigate('Register')}
          />
        </View>

      </View>
    )
  }