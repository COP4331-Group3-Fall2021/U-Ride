//import * as React from 'react';
import React, { Component, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Button, Dimensions, AsyncStorage } from 'react-native';
import { Header, Tab, TabView, ThemeProvider } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import Card from '../cards/Card';

export default function App() {

  const [riderData, setRiderData] = useState(<></>);
  const [driverData, setDriverData] = useState(<></>);

  const [tabIdx, setTabIdx] = useState(1);

  async function loadRiderData() {
    let user = JSON.parse(await AsyncStorage.getItem('user_data'));
    fetch(`https://u-ride-cop4331.herokuapp.com/carpool/findRides/${user.userID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(j => riderDataToReact(j))
      .then(data => setRiderData(data))
      .catch(error => console.error(error))
  }

  async function loadDriverData() {
    let user = JSON.parse(await AsyncStorage.getItem('user_data'));
    fetch(`https://u-ride-cop4331.herokuapp.com/carpool/findDrives/${user.userID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(j => driverDataToReact(j))
      .then(data => setDriverData(data))
      .catch(error => console.error(error))
  }

  // initialize rider & driver pool data on component load
  useEffect(() => {
    loadRiderData();
    loadDriverData();
  }, []);


  function riderDataToReact(dataArray) {
    console.log("rider: ", dataArray);
    let cards = dataArray?.length > 0 && dataArray.map((data, i) => {
      let isoDate = new Date(data.poolDate);

      let name = `${data.driver.name?.first} ${data.driver.name?.last}`; // TODO
      let date = `${isoDate.getMonth() + 1}/${isoDate.getDate()}/${isoDate.getFullYear()}`;
      let time = `${isoDate.getHours() % 12 == 0 ? 12 : isoDate.getHours() % 12}:${isoDate.getMinutes() < 10 ? 0 : ''}${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
      let origin = { lat: data.origin[0], lng: data.origin[1] };
      let destination = { lat: data.destination[0], lng: data.destination[1] };
      let currPassCount = data.numParticipants;
      let passCap = data.maxParticipants;
      let passengers = data.riders; // TODO

      return <Card key={data._id} name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={''} passengers={passengers} />
    });

    // if no cards, show no results
    if (!cards) {
      return (
        <>
          <Text style={styles.noresults} >You are not riding in any carpools.</Text>
        </>
      )
    }

    return (
      <>
        {cards}
      </>
    )
  }

  function driverDataToReact(dataArray) {
    console.log("driver: ", JSON.stringify(dataArray));
    let cards = dataArray?.length > 0 && dataArray.map((data, i) => {
      let isoDate = new Date(data.poolDate);

      let name = `${data.driver.name.first} ${data.driver.name.last}`;
      let date = `${isoDate.getMonth() + 1}/${isoDate.getDate()}/${isoDate.getFullYear()}`;
      let time = `${isoDate.getHours() % 12 == 0 ? 12 : isoDate.getHours() % 12}:${isoDate.getMinutes() < 10 ? 0 : ''}${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
      let origin = { lat: data.origin[0], lng: data.origin[1] };
      let destination = { lat: data.destination[0], lng: data.destination[1] };
      let currPassCount = data.numParticipants;
      let passCap = data.maxParticipants;
      let passengers = data.riders; // TODO

      return <Card key={data._id} name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={''} passengers={passengers} />
    });

    // if no cards, show no results
    if (!cards) {
      return (
        <>
          <Text style={styles.noresults}>You are not driving any carpools.</Text>
        </>
      )
    }

    return (
      <>
        {cards}
      </>
    )
  }


  return (
    <View style={styles.container} >
      {/* <MapView style={styles.map} initialRegion={{
      latitude: 28.6024,
      longitude: -81.2001,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    }} /> */}
      <Header
        centerComponent={{ text: 'U-Ride', style: { color: '#fff', fontSize: 20 } }} containerStyle={{ backgroundColor: '#007ea7' }}
      />
      <ScrollView style={styles.scrollView}>
        <Tab value={tabIdx} onChange={setTabIdx} >
          <Tab.Item title="Riding" titleStyle={{ color: "#FFF" }} containerStyle={{}} />
          <Tab.Item title="Driving" titleStyle={{ color: "#FFF" }} />
        </Tab>

        <TabView value={tabIdx} onChange={setTabIdx} >
          <TabView.Item style={{ width: Dimensions.get('window').width }}>
            {riderData}
          </TabView.Item >
          <TabView.Item style={{ width: Dimensions.get('window').width }}>
            {driverData}
          </TabView.Item>
        </TabView>
        {tabIdx === 0 && <>
        </>}
        {tabIdx === 1 && <>
        </>}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#003459'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
  },
  noresults: {
    fontSize: 20,
    color: '#A1DBF2',
    // font-family: 'Nunito', sans-serif,
    alignItems: 'center',
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
