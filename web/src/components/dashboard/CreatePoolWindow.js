import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';


export default function CreatePoolWindow({ closeModal, showCreate, refreshDriverData }) {

    // use UseState
    const [message, setMessage] = useState('');

    let style = showCreate ? { display: 'flex' } : { display: 'none' }

    // variable references for each input
    let origin;
    let dest;
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
        if (!validInput(origin.value) || !validInput(dest.value) || !validInput(maxPass.value) || !validInput(dateTime.value)) {
            setMessage('Missing a field.');

            // draw red border on missing fields
            if (!validInput(origin.value)) {
                document.getElementById("createOrigin").classList.add('input-invalid');
            }

            if (!validInput(dest.value)) {
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
                "maxParticipants": maxPass.value,
                "poolDate": dateTime.value,
                "origin": [0, 0], // TODO, convert to latitude and longitude
                "destination": [0, 0], // TODO, convert to latitude and longitude
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
                    <input type="text" id="createOrigin" placeholder="Origin" ref={(c) => origin = c} />
                    <label htmlFor="createDest" className="input-headers">Destination:</label>
                    <input type="text" id="createDest" placeholder="Destination" ref={(c) => dest = c} />
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