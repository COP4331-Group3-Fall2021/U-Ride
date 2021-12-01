import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Linking } from 'react-native';

/* Component properties:
 *                    name (required) - driver's name
 *                    date (required) - date of the carpool; format MM/DD/YY
 *                    time (required) - time of the carpool; format XX:XXpm or XX:XXam
 *                  origin (required) - the carpool's starting point; format???
 *             destination (required) - the carpool's ending point; format????
 *   currentPassengerCount (required) - number of users currently in the carpool
 *            passengerCap (required) - total capacity of the carpool
 *              passengers (required) - list of passengers
 *              buttonName (required) - name for the button, leave/disband
 */
export default function Card({ name, date, time, origin, destination, currentPassengerCount, passengerCap, buttonName, passengers = ["me", "you", "what"], cardClick = (origin, destination) => { } }) {
    const passengerLIs = () => {
        return passengers.map((passengerName) => {
            return (
                <View>
                    <Text>- {passengerName}</Text>
                </View>
            );
        });
    };

    // this is a temporary solution to make the application not break
    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat && latLongObj.lng;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

    return (
        <View style={styles.joincard} onClick={() => cardClick(origin, destination)}>
            <View style={styles.joincardheader}>
                <Text style={{ fontWeight: 'bold' }}>🚘 {name}</Text>
                <Text style={{ fontWeight: 'bold' }}>{date} @ {time}</Text>
            </View>
            <View style={styles.joincardcontent}>
                <View style={styles.leftcol}>
                    <Text style={styles.lefttext}>📍 <Text style={{ fontWeight: 'bold' }}>To: </Text> {latLongToStr(origin)}</Text>
                    <Text style={styles.lefttext}>📍 <Text style={{ fontWeight: 'bold' }}>From: </Text> {latLongToStr(destination)}</Text>
                    <View style={styles.cardButton}>
                        <Button
                            buttonStyle={{ color: '#003459', borderRadius: 15, height: 45 }}
                            title="Find Route"
                            onPress={() => Linking.openURL('https://www.google.com/maps/dir/28.559116553406053,+-81.3652749539658/28.6040377,-81.20254/')}
                        />
                    </View>

                </View>

                <View style={styles.rightcol}>
                    <Text style={{ fontWeight: 'bold' }}>🚗 {currentPassengerCount}/{passengerCap} passengers</Text>
                    <View style={styles.passengerlist}>
                        {passengerLIs()}
                    </View>
                </View>



            </View>
        </View>
    );
}

// card styling
const styles = StyleSheet.create({
    joincard: {
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width * .93,
        height: Dimensions.get('window').height * .3,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        marginTop: Dimensions.get('window').height * .02,
        //paddingTop: Dimensions.get('window').height * .03,
        //paddingBottom: Dimensions.get('window').height * .03,
        //marginBottom: Dimensions.get('window').height * .02,
    },

    joincardcontent: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        fontSize: 17,
        //paddingTop: Dimensions.get('window').height * .1
    },

    joincardheader: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width * .93,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#EBEBEB',
        fontWeight: 'bold',
        fontSize: 19,
        paddingLeft: Dimensions.get('window').width * .04,
        paddingRight: Dimensions.get('window').width * .04,
        //height: 2.5em;
        height: Dimensions.get('window').height * .05,
        //marginBottom: Dimensions.get('window').height * .01

    },

    leftcol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'left',
        paddingLeft: Dimensions.get('window').width * .06,
        paddingRight: Dimensions.get('window').width * .06,
        width: Dimensions.get('window').width / 2,
        paddingTop: Dimensions.get('window').height * .02
        //height: Dimensions.get('window').height/4,
    },

    lefttext: {
        //marginBottom: Dimensions.get('window').height * .02
    },

    rightcol: {
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'center',
        alignSelf: 'center',
        //sjustifyContent: 'top',
        width: Dimensions.get('window').width / 2,
        paddingRight: Dimensions.get('window').width * .04,
        paddingLeft: Dimensions.get('window').width * .14,
        //height: Dimensions.get('window').height/4,
        //marginBottom: Dimensions.get('window').height * .02
    },

    cardButton: {
        //backgroundColor: "#003459",
        //color: "#FFFFFF",
        //alignItems: 'center',
        //width: 6em;
        //width: Dimensions.get('window').width / 4,
        //height: Dimensions.get('window').height * .2,
        paddingTop: Dimensions.get('window').height * .05
    },

    passengerlist: {
        paddingLeft: Dimensions.get('window').width * .01,
        marginTop: Dimensions.get('window').height * .02
    },

    removeriderbutton: {
        opacity: 0,
        //border: 'none',
        backgroundColor: 'transparent',
        //fontSize: 'inherit',
        padding: 0,
        margin: 0,
    }


});
