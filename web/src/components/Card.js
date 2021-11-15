import React from 'react';
import '../styles/Card.css';

/* Component properties:
 *                    name (required) - driver's name
 *                  origin (required) - the carpool's starting point; format???
 *             destination (required) - the carpool's ending point; format????
 *   currentPassengerCount (required) - number of users currently in the carpool
 *            passengerCap (required) - total capacity of the carpool
 *           recurringDays (required) - an Array containing the days of the week that this carpool is recurrent on
 */
export default function Card ({name, origin, destination, currentPassengerCount, passengerCap, recurringDays, onClick=() => {}, }) {
    function constructRecurringDays() {

    }
    
    return (
        <div class="card" onClick={onClick}>
            <div class="row">
                <div class="column" id="left">
                    <p>🚘 {name}</p>
                    <p>📍 To: {origin}</p>
                    <p>📍 From: {destination}</p>
                    <p>🚗 {currentPassengerCount}/{passengerCap} passengers</p>
                </div>
                <div class="column" id="right">
                    {recurringDays.map((day, i) => <p>✅ {day}</p>)}
                </div>
            </div>
        </div>
    );
}