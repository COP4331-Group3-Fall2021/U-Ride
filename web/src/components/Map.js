import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api'


// Prevents a Google Map API warning
const mapLibrariesToUse = ["places"];

/* 'origin' and 'destination' need to be an object with this schema:
 * {lat: float, lng: float}
 */
export default function Map({origin, destination}) {
    const [directionsServiceState, setDirectionsServiceState] = useState(null);
    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    /* From the Google Maps API:
     * "Accessing the Directions service is asynchronous, since the Google Maps API needs to make a call to an external server.
     *  For that reason, you need to pass a callback method to execute upon completion of the request. This callback method should process the result(s)."
     */
    function directionsServiceCallback(response) {
        if (response?.status !== 'OK') {
            console.error('Failed to call the Google Maps Directions Service.');
            if (directionsServiceState !== null) {
                setDirectionsServiceState(null);
            }
            return;
        }
        setDirectionsServiceState(response);
    }
    
    let validOrigin = (origin?.lat !== null && origin?.lng !== null);
    let validDestination = (destination?.lat !== null && destination?.lng !== null);

    // By default, center the map on UCF
    let center = {lat: 28.602336, lng: -81.200225};
    
    // Prevents the map from infinitely calculating directions
    useEffect(() => {
        setDirectionsServiceState(null);
    }, [origin, destination]);

    return (
        <LoadScript
            googleMapsApiKey={googleAPIKey}
            libraries={mapLibrariesToUse}>
            <GoogleMap
                mapContainerStyle={{height: "100%", width: "100%", minHeight: "40em"}}
                center={center}
                zoom={14}>
                {validOrigin && validDestination && !directionsServiceState &&
                    <>
                        <DirectionsService
                            options={{origin: origin, destination: destination, travelMode: 'DRIVING'}}
                            callback={(response) => directionsServiceCallback(response)} />
                    </>
                }
                {directionsServiceState &&
                    <DirectionsRenderer
                        options={{directions: directionsServiceState}} />
                }
                { /* Child components, such as markers, info windows, etc. */ }
            <></>
            </GoogleMap>
        </LoadScript>  
    );
}