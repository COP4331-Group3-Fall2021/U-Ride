import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';
import Autocomplete from "react-google-autocomplete";
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

export default function CreatePoolWindow({ closeModal, showCreate, refreshDriverData }) {

    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    // use UseState
    const [message, setMessage] = useState('');
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    let style = showCreate ? { display: 'flex' } : { display: 'none' }

    // variable references for each input
    let maxPass;
    let dateTime;

    // validate the fields
    function validateForm() {

        // reset errors
        document.getElementById("createOrigin").classList.remove('input-invalid');
        document.getElementById("createDest").classList.remove('input-invalid');
        document.getElementById("maxPassengers").classList.remove('input-invalid');
        document.getElementById("createStart").classList.remove('input-invalid');
        setMessage('');

        // if any fields invalid, set message
        if (isObjectEmpty(origin) || isObjectEmpty(destination) || !validInput(maxPass.value) || !validInput(dateTime.value)) {
            setMessage('Missing a field.');

            // draw red border on missing fields
            if (isObjectEmpty(origin)) {
                document.getElementById("createOrigin").classList.add('input-invalid');
            }

            if (isObjectEmpty(destination)) {
                document.getElementById("createDest").classList.add('input-invalid');
            }

            if (!validInput(maxPass.value)) {
                document.getElementById("maxPassengers").classList.add('input-invalid');
            }

            if (!validInput(dateTime.value)) {
                document.getElementById("createStart").classList.add('input-invalid');
            }

            return;
        } else {
            // Passed validation, get rid of errors
            document.getElementById("createOrigin").classList.remove('input-invalid');
            document.getElementById("createDest").classList.remove('input-invalid');
            document.getElementById("maxPassengers").classList.remove('input-invalid');
            document.getElementById("createStart").classList.remove('input-invalid');
            setMessage('');
        }

        let user = JSON.parse(localStorage.getItem('user_data'));
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "numParticipants": 0,
                "maxParticipants": parseInt(maxPass.value),
                "poolDate": dateTime.value,
                "origin": [origin.lat, origin.lng],
                "destination": [destination.lat, destination.lng],
                "riders": [],
                "driver": {
                    "_id": user.userID,
                    "name": { "first": user.firstName, "last": user.lastName }
                },
                "isFull": false
            })
        })
            .then(res => res.ok && (closeModal() || refreshDriverData()))
            .catch(error => { console.error(error); setMessage('A network error occurred.') })
    }

    return (
        <div id="create-pool-modal" className="modal" style={style}>
            <div className="modal-content">
                <h2 className="modal-header">Create Pool</h2>
                <hr className="separator" />
                <form className="modal-form">
                    <span id="form-result">{message}</span>
                    <label htmlFor="createOrigin" className="input-headers">Origin:</label>
                    {/* Reference for place obj: https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult.geometry */}
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setOrigin({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="createOrigin" />
                    <label htmlFor="createDest" className="input-headers">Destination:</label>
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setDestination({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="createDest" />
                    <label htmlFor="maxPassengers" className="input-headers">Max Passengers:</label>
                    <input type="number" id="maxPassengers" placeholder="Max Passengers" min="1" max="7" ref={(c) => maxPass = c} />
                    <label htmlFor="createStart" className="input-headers">Day &amp; Time:</label>
                    <input type="datetime-local" id="createStart" ref={(c) => dateTime = c} />

                    <div className="modal-buttons">
                        <Button onClick={(e) => { e.preventDefault(); validateForm() }} text="Create" bgcolor="" color="" />
                        <Button onClick={(e) => { e.preventDefault(); closeModal() }} text="Cancel" bgcolor="" color="" />
                    </div>
                </form>
            </div>
        </div>
    );
}


// Validates a string
function validInput(input) {
    if (input === undefined || input === "") {
        return false;
    }
    else {
        // Valid input
        return true;
    }
}

// Check if an object is empty
function isObjectEmpty(input) {
    return input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype;
}