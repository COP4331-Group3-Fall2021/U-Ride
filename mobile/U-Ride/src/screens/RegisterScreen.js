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

  function setMessage(message)
  {
    console.log(message);
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
  if (!validateInput(lastName.value)) {
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
        <View style={{ flexDirection:'column' }}>
          <Text style={{fontSize:40}}>     U-ride </Text>
          <Text style={{fontSize:20}}>Eco and wallet friendly </Text>    
        </View>

     
        
        </View>

        <View style = {styles.container}>
          <Image style= {{width: 200, height:200}} source = {{uri:  'https://i.imgur.com/QLSNjfH.png'}} />  
        </View>
        <View style = {styles.textWindow}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChange={(e) => setUserCreds({...userCreds, firstName:e.nativeEvent.text})}
          />     
        </View>

        <View style = {styles.textWindow}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChange={(e) => setUserCreds({...userCreds, lastName:e.nativeEvent.text})}
          />   
        </View>

        <View style = {styles.textWindow}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChange={(e) => setUserCreds({...userCreds, email:e.nativeEvent.text})}
          />     
        </View>

        <View style = {styles.textWindow}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChange={(e) => setUserCreds({...userCreds, password:e.nativeEvent.text})}
          />   
        </View>

        <View style = {styles.textWindow}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChange={(e) => setUserCreds({...userCreds, confirmPassword:e.nativeEvent.text})}
          />   
        </View>
        

        <View style = {styles.textWindow}>
          <Button 
            title="Register"
            color = '#ed7a7a'
            onPress={() => doRegister()}
          />
        </View>
      </View>
    )
  }