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
 *              passengers (required) - list of passengers
 *              buttonName (required) - name for the button, leave/disband
 */
export default function Card({ name, date, time, origin, destination, currentPassengerCount, passengerCap, buttonName, passengers, cardClick = (origin, destination) => {}, buttonClick = () => {} }) {
    const [passengerLIs, setPassengerLIs] = React.useState(<></>);

    // this is a temporary solution to make the application not break
    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat !== undefined && latLongObj.lng !== undefined;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

    // resolve rider names in card (from their hashed ID)
    React.useEffect(() => {
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
                    <span className="left-text">📍 <b>To:</b> {latLongToStr(origin)}</span>
                    <span className="left-text">📍 <b>From: </b> {latLongToStr(destination)}</span>
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