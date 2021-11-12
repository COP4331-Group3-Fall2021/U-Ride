import React from 'react';
import GoogleMapReact from 'google-map-react';
require('dotenv').config();

export default function Map ({origin, destination, location={lat: 28.602336, lng: -81.200225}, zoomLevel=14}) {
    const apiIsLoaded = (map, maps) => {
        /* 'origin' and 'destination' need to be an object with this schema:
         * {lat: insert_latitude, lng: insert_longitude}
         */
        if (origin && destination) {
            var originMarker = new maps.Marker({
                position: origin,
                map: map,
            });
            var destinationMarker = new maps.Marker({
                position: destination,
                map: map,
            });
        }

        if (map) {
            var marker = new maps.Marker({
                position: {lat: 28.602336, lng: -81.200225},
                map: map
            })
        }
    };

    return (
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB-1ftwBLZ1yoznFm4_pB-i3wqCnecSirY' }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}>
            </GoogleMapReact>
        </div>
    );
}

// process.env.GOOGLEMAPS_KEY