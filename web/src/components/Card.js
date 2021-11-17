import React from 'react';
import '../styles/Card.css';
import Button from './Button';

/* Component properties:
 *                    name (required) - driver's name
 *                    date (required) - date of the carpool; format MM/DD/YY
 *                    time (required) - time of the carpool; format XX:XXpm or XX:XXam
 *                  origin (required) - the carpool's starting point; format???
 *             destination (required) - the carpool's ending point; format????
 *   currentPassengerCount (required) - number of users currently in the carpool
 *            passengerCap (required) - total capacity of the carpool
 */
export default function Card({ name, date, time, origin, destination, currentPassengerCount, passengerCap, onClick = () => { }, }) {

    return (
        <div class="card" onClick={onClick}>
            <div class="card-header">
                <span>🚘 {name}</span>
                <span>{date} @ {time}</span>
            </div>
            <div class="card-content">
                <div class="left-col">
                    <span class="left-text">📍 <b>To:</b> {origin}</span>
                    <span class="left-text">📍 <b>From: </b> {destination}</span>
                    <span class="left-text">🚗 <b>{currentPassengerCount}/{passengerCap} passengers</b></span>
                </div>
                <div class="right-col">
                    <Button text="Join" bgcolor="#0466c8" color="#FFFFFF" />
                </div>
            </div>
        </div>
    );
}