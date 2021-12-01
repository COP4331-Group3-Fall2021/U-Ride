import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-navigation';
import Card from '../cards/Card';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
                  latitude: 28.6024,
                  longitude: -81.2001,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
              }}/>
      
      <ScrollView style={styles.scrollView}>
        <Card  name="Driver" date="10/20/30" time="5:00pm" origin="here" destination="there" currentPassengerCount="2" passengerCap="4" buttonName="Find Route" />
        <Card  name="Passenger" date="10/20/30" time="5:00pm" origin="here" destination="there" currentPassengerCount="2" passengerCap="4" buttonName="Find Route" />
      </ScrollView>
    </View>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003459'
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
  },
  card: {
    
  }
});
