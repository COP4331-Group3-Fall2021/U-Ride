import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default function RegisterScreen({navigation}) {

  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [error, setError] = new useState("");
  function setMessage(message)
  {
    setError(message);
  }

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

function doRegister()
{

  if (userCreds.email === null || userCreds.email === undefined)
  {
    setMessage('Missing a field.');
    return;
  } 
  if (userCreds.password === null || userCreds.password === undefined)
  {
    setMessage('Missing a field.');
    return;
  } 
  if (userCreds.firstName === null || userCreds.firstName === undefined)
  {
    setMessage('Missing a field.');
    return;
  } 
  if (userCreds.lastName === null || userCreds.lastName === undefined)
  {
    setMessage('Missing a field.');
    return;
  } 
  if (userCreds.confirmPassword === null || userCreds.confirmPassword === undefined)
  {
    setMessage('Missing a field.');
    return;
  } 
  // Any verfication needs to be done here 
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


if (userCreds.password !== userCreds.confirmPassword)
{
  setMessage("Passwords do not match");
  return;
}
// TODO: set error messages
if (!validateInput(userCreds.firstName) ||!validateInput(userCreds.lastName) ||!validateInput(userCreds.email) || !validateInput(userCreds.password) || !validateInput(userCreds.confirmPassword)) {
  setMessage('Missing a field.');

  if (!validateInput(userCreds.firstName)) {
      // document.getElementById("registerFirstName").classList.add('input-invalid');
  } else {
      // document.getElementById("registerFirstName").classList.remove('input-invalid');
  }
  if (!validateInput(userCreds.lastName)) {
      // document.getElementById("registerLastName").classList.add('input-invalid');
  } else {
      // document.getElementById("registerLastName").classList.remove('input-invalid');
  }
  if (!validateInput(userCreds.email)) {
      // document.getElementById("registerEmail").classList.add('input-invalid');
  } else {
      // document.getElementById("registerEmail").classList.remove('input-invalid');
  }
  if (!validateInput(userCreds.password)) {
      // document.getElementById("registerPassword").classList.add('input-invalid');
  } else {
      // document.getElementById("registerPassword").classList.remove('input-invalid');
  }
  if (!validateInput(userCreds.confirmPassword)) {
      // document.getElementById("registerConfirmPassword").classList.add('input-invalid');
  } else {
      // document.getElementById("registerConfirmPassword").classList.remove('input-invalid');
  }
  return;
} else {
  setMessage('');
}
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  var requestBody = JSON.stringify({
      name:{
          firstName:userCreds.firstName,
          lastName:userCreds.lastName
      },
      email:userCreds.email,
      password:userCreds.password
  });
  var requestOptions = {
      method: 'POST',
      headers: headers,
      body: requestBody,
      redirect: 'follow'
  };

  // Send Register API request and handle server response
  fetch('https://u-ride-cop4331.herokuapp.com/auth/register', requestOptions)
      .then(response => response.text())
      .then(result => {
          // Handle error messages
          if (result === 'EMAIL_EXISTS') {
              setMessage('Account already exists.');
          }
          else if (result === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
              setMessage("You're being rate limited.");
          }
          else if (result === 'Account already exists.') {
            setMessage("You're being rate limited.");
        }
          else if (result === "WEAK_PASSWORD")
          {
            setMessage("Please choose a stronger password.");
          }
          else if (result === "INVALID_EMAIL")
          {
            setMessage("Account cannot be found.");
          }
          // Handle success
          else {
              let responseBody = JSON.parse(result);
              setMessage('');
              // Send user to post-registration
              navigation.navigate('PostRegister');
          }
      })
      .catch(error => console.error('error', error));
}
    return (
      <View style={{ backgroundColor:'#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> 
          {userCreds.firstName}
          </Text>
        <View style={{alignItems: 'flex-end', }}>
        

     
        
        </View>

        <View style = {styles.container}>
          <Image style= {{width: 150, height: 125, marginBottom: 25}} source = {{uri:  'https://lh3.googleusercontent.com/pw/AM-JKLUo4dsqU5BE9qNwz9GgidrqNVzaVluKFgl0mU0eTib2NFPa7q6lAclY0piw1dnyMEXppcFc_TpCvnTpRIQqar0oFUEQT_gRCOuTU0qwRQIkkTuQnhd7CcVKVY3lsVr4obAdS2jevMLdS3g0-fN2m5ju=w680-h439-no?authuser=0'}} />  
        </View>
  
        <Text style={{color: 'red', fontSize:20, fontWeight:'bold', marginBottom:10 }}> {error} </Text>
          <Input
           containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="First Name"
            onChange={(e) => setUserCreds({...userCreds, firstName:e.nativeEvent.text})}
          />     


       
          <Input
            containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Last Name"
            onChange={(e) => setUserCreds({...userCreds, lastName:e.nativeEvent.text})}
          />   
 

       
          <Input
            containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Email"
            onChange={(e) => setUserCreds({...userCreds, email:e.nativeEvent.text})}
          />     
     

       
          <Input
            containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Password"
            secureTextEntry={true}
            onChange={(e) => setUserCreds({...userCreds, password:e.nativeEvent.text})}
          />   


       
          <Input
           containerStyle = {{width:'75%', maxWidth:500, marginBottom: 10}}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChange={(e) => setUserCreds({...userCreds, confirmPassword:e.nativeEvent.text})}
          />   
          
        <View style = {{width:'75%', maxWidth:500, borderRadius: 20, marginBottom: 20}}>
          <Button 
            title="Create Account"
            buttonStyle={{backgroundColor: '#003459',borderRadius: 15}}
            onPress={() => doRegister()}
          />
        </View>

        <View style = {{width:'75%', maxWidth:500, marginBottom:10, borderRadius: 20}}>
          <Button 
            buttonStyle={{color:'#003459', }}
            title="Log In"
            type = 'clear'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }