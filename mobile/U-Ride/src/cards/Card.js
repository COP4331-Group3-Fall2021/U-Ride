import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Linking, TouchableHighlight } from 'react-native';
import getEnv from '../../env.example';

const googleAPIKey = getEnv().GOOGLE_MAPS_API_KEY;

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
export default function Card({ name, date, time, origin, destination, currentPassengerCount, passengerCap, buttonName, passengers = [] }) {
    const [passengerLIs, setPassengerLIs] = useState(<></>);
    const [originAddr, setOriginAddr] = useState(latLongToStr(origin));
    const [destinAddr, setDestinAddr] = useState(latLongToStr(destination));

    // resolve rider names in card (from their hashed ID)
    useEffect(() => {
        async function run() {
            const lis = [];
            for (const passengerName of passengers) {
                const res = await fetch(`https://u-ride-cop4331.herokuapp.com/auth/getUser/${passengerName}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                if (!res.ok) {
                    console.error(`Failed to get name for ${passengerName}`);
                    lis.push(<View key={passengerName}><Text>- {passengerName}</Text></View>);
                }

                const json = await res.json();
                lis.push(<View key={passengerName}><Text>- {`${json.name?.firstName} ${json.name?.lastName}`}</Text></View>);
            };

            setPassengerLIs(lis);

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin.lat},${origin.lng}&key=${googleAPIKey}`)
                .then(response => response.json())
                .then(res => {
                    if (res.status !== 'OK') {
                        console.warn(`Bad request or zero results for origin=${origin}`, res);
                        return;
                    }

                    if (!res.results[0]) {
                        console.error(`No address results for origin=${origin}.`);
                        return;
                    }

                    for (const place of res.results) {
                        if (!place.types.includes('plus_code')) {
                            setOriginAddr(place.formatted_address);
                            break;
                        }
                    }
                })
                .catch(e => console.error(`Request to get address of ${origin} failed\n`, e));

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${destination.lat},${destination.lng}&key=${googleAPIKey}`)
                .then(response => response.json())
                .then(res => {
                    if (res.status !== 'OK') {
                        console.warn(`Bad request or zero results for destination=${destination}`, res);
                        return;
                    }

                    if (!res.results[0]) {
                        console.error(`No address results for destination=${destination}.`);
                        return;
                    }

                    for (const place of res.results) {
                        if (!place.types.includes('plus_code')) {
                            setDestinAddr(place.formatted_address);
                            break;
                        }
                    }
                })
                .catch(e => console.error(`Request to get address of ${destination} failed\n`, e));
        }
        run();
    }, []);

    // const passengerLIs = () => {
    //     return passengers.map((passengerName) => {
    //         return (
    //             <View>
    //                 <Text>- {passengerName}</Text>
    //             </View>
    //         );
    //     });
    // };

    // this is a temporary solution to make the application not break
    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat && latLongObj.lng;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

    return (
        <TouchableHighlight onPress={() => Linking.openURL(`https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}/`)}>

            <View style={styles.joincard} >
                <View style={styles.joincardheader}>
                    <Text style={{ fontWeight: 'bold' }}>🚘 {name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{date} @ {time}</Text>
                </View>
                <View style={styles.joincardcontent}>
                    <View style={styles.leftcol}>
                        <Text style={styles.lefttext}>📍 <Text style={{ fontWeight: 'bold' }}>To: </Text> {originAddr}</Text>
                        <Text style={styles.lefttext}>📍 <Text style={{ fontWeight: 'bold' }}>From: </Text> {destinAddr}</Text>
                    </View>

                    <View style={styles.rightcol}>
                        <Text style={{ fontWeight: 'bold' }}>🚗 {currentPassengerCount}/{passengerCap} passengers</Text>
                        <View style={styles.passengerlist}>
                            {passengerLIs}
                        </View>
                    </View>



                </View>
            </View>
        </TouchableHighlight>
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
        //marginLeft: Dimensions.get('window').width * .03,
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
        // justifyContent: 'top',
        width: Dimensions.get('window').width / 2,
        paddingRight: Dimensions.get('window').width * .04,
        paddingLeft: Dimensions.get('window').width * .14,
        //height: Dimensions.get('window').height/4,
        //marginBottom: Dimensions.get('window').height * .02
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
