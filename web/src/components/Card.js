import React from 'react';
import '../styles/Card.css';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
export default function JoinedCard({ name, date, time, origin, destination, currentPassengerCount, passengerCap, buttonName, passengers, cardClick = () => {}, buttonClick = () => {} }) {
    const passengerLIs = passengers.map((passengerName) => {
        return <li>{passengerName}</li>
    });

    return (
        <div class="join-card" onClick={cardClick}>
            <div class="join-card-header">
                <span>🚘 {name}</span>
                <span>{date} @ {time}</span>
            </div>
            <div class="join-card-content">
                <div class="left-col">
                    <span class="left-text">📍 <b>To:</b> {origin}</span>
                    <span class="left-text">📍 <b>From: </b> {destination}</span>
                    <Button text={buttonName} bgcolor="#007EA7" color="#FFFFFF" className="cardButton" onClick={buttonClick}/>
                </div>
                <div class="right-col">
                    <span>🚗 <b>{currentPassengerCount}/{passengerCap} passengers</b></span>
                    <ul class="passenger-list">
                        {passengerLIs}
                    </ul>
                </div>
            </div>
        </div>
    );
}