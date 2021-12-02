import React, { useEffect, useState } from 'react'
import Button from '../Button';
import '../../styles/Modal.css';
import Autocomplete from "react-google-autocomplete";

export default function EditPoolWindow({closeModal, showEdit, originalInfo, refreshDriverData}) {

    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    // use UseState
    const [message, setMessage] = useState('');
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    let style = showEdit ? { display: 'flex' } : { display: 'none' }

    // variable references for each input
    let maxPass;
    let dateTime;

    // api call, delete the pool
    function deletePool() {
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/delete/${originalInfo._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok && (closeModal() || refreshDriverData()))
            .catch(error => { console.error(error); setMessage('A network error occurred.') })
    }

    // validate the fields
    function validateForm() {

        // reset errors
        document.getElementById("editOrigin").classList.remove('input-invalid');
        document.getElementById("editDest").classList.remove('input-invalid');
        document.getElementById("editMaxPassengers").classList.remove('input-invalid');
        document.getElementById("editStart").classList.remove('input-invalid');
        setMessage('');

        // if any fields invalid, set message
        if (isObjectEmpty(origin) || isObjectEmpty(destination) || !validInput(maxPass.value) || !validInput(dateTime.value)) {
            setMessage('Missing a field.');

            // draw red border on missing fields
            if (isObjectEmpty(origin)) {
                document.getElementById("editOrigin").classList.add('input-invalid');
            }

            if (isObjectEmpty(destination)) {
                document.getElementById("editDest").classList.add('input-invalid');
            }

            if (!validInput(maxPass.value)) {
                document.getElementById("editMaxPassengers").classList.add('input-invalid');
            }

            if (!validInput(dateTime.value)) {
                document.getElementById("editStart").classList.add('input-invalid');
            }

            return;
        } else {
            // Passed validation, get rid of errors
            document.getElementById("editOrigin").classList.remove('input-invalid');
            document.getElementById("editDest").classList.remove('input-invalid');
            document.getElementById("editMaxPassengers").classList.remove('input-invalid');
            document.getElementById("editStart").classList.remove('input-invalid');
            setMessage('');
        }

        // prepare api call
        let body = {};
        Object.assign(body, originalInfo);
        
        body.origin = [origin.lat, origin.lng];
        body.destination = [destination.lat, destination.lng];
        body.maxParticipants = parseInt(document.getElementById("editMaxPassengers").value);
        body.poolDate = new Date(document.getElementById("editStart").value).toUTCString();

        // api call, update the pool
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.ok && (closeModal() || refreshDriverData()))
            .catch(error => { console.error(error); setMessage('A network error occurred.') })
    }

    // initialize pool data on component load
    useEffect(() => {
        document.getElementById("editOrigin").value = latLongToStr(originalInfo.origin);
        document.getElementById("editDest").value = latLongToStr(originalInfo.destination);
        document.getElementById("editMaxPassengers").value = `${originalInfo.maxParticipants}`;
        document.getElementById("editStart").value = originalInfo.poolDate;
    }, [originalInfo]);

    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat !== undefined && latLongObj.lng !== undefined;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

    return (
        <div id="edit-pool-modal" className="modal" style={style}>
            <div className="modal-content">
                <h2 className="modal-header">Edit Pool</h2>
                <hr className="separator" />
                <form className="modal-form">
                    <span id="form-result">{message}</span>
                    <label htmlFor="editOrigin" className="input-headers">Origin:</label>
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setOrigin({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="editOrigin" />
                    <label htmlFor="editDest" className="input-headers">Destination:</label>
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setDestination({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="editDest" />
                    <label htmlFor="editMaxPassengers" className="input-headers">Max Passengers:</label>
                    <input type="number" id="editMaxPassengers" placeholder="Max Passengers" min="1" max="7" ref={(c) => maxPass = c}/>
                    <label htmlFor="editStart" className="input-headers">Start Time:</label>
                    <input type="datetime-local" id="editStart"  ref={(c) => dateTime = c} /> 

                    <div className="modal-buttons">
                        <Button onClick={(e) => { e.preventDefault(); validateForm() }} text="Save" bgcolor="" color="" />
                        <Button onClick={(e) => { e.preventDefault(); closeModal() }} text="Cancel" bgcolor="" color="" />
                        <Button onClick={(e) => { e.preventDefault(); deletePool() }} text="Delete" bgcolor="#FF7575 " color="#000000" />
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