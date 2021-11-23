import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-navigation';

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
        <Text style = {{fontSize:40}}>HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO HELLOHELLO HELLO</Text>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a89dd2'
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
  },
});
