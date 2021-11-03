import React from 'react';
import GoogleMapReact from 'google-map-react';
require('dotenv').config();

export default function Map ({location, zoomLevel}) {
    return (
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLEMAPS_KEY }}
                defaultCenter={location}
                defaultZoom={zoomLevel}/>
        </div>
    );
}