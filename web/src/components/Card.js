import React, { useState, useEffect } from 'react';
import '../styles/Card.css';
import Button from './Button';

const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

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
export default function Card({ name, date, time, origin, destination, currentPassengerCount, passengerCap, buttonName, passengers, cardClick = (origin, destination) => {}, buttonClick = () => {} }) {
    const [passengerLIs, setPassengerLIs] = useState(<></>);
    const [originAddr, setOriginAddr] = useState(latLongToStr(origin));
    const [destinAddr, setDestinAddr] = useState(latLongToStr(destination));

    // this is a temporary solution to make the application not break
    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat !== undefined && latLongObj.lng !== undefined;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

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
                    lis.push(<li key={passengerName}>{passengerName}</li>);
                }
                
                const json = await res.json();
                lis.push(<li key={passengerName}>{`${json.name?.firstName} ${json.name?.lastName}`}</li>);
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

    return (
        <div className="join-card" onClick={() => cardClick(origin, destination)}>
            <div className="join-card-header">
                <span>🚘 {name}</span>
                <span>{date} @ {time}</span>
            </div>
            <div className="join-card-content">
                <div className="left-col">
                    <span className="left-text">📍 <b>To:</b> {originAddr}</span>
                    <span className="left-text">📍 <b>From: </b> {destinAddr}</span>
                    <Button text={buttonName} bgcolor="#007EA7" color="#FFFFFF" className="cardButton" onClick={buttonClick}/>
                </div>
                <div className="right-col">
                    <span>🚗 <b>{currentPassengerCount}/{passengerCap} passengers</b></span>
                    <ul className="passenger-list">
                        {passengerLIs}
                    </ul>
                </div>
            </div>
        </div>
    );
}