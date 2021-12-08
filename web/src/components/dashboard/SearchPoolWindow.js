import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';
import Autocomplete from "react-google-autocomplete";

export default function SearchPoolWindow({closeModal, showSearch, setSearchData}) {

    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    // use UseState
    const [message, setMessage] = useState('');
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    let style = showSearch ? {display: 'flex'} : {display: 'none'};

    // Clear all form inputs
    function clearForm() {
        document.getElementById("searchForm").reset();
    }

    // Validate form fields
    function validateForm() {
        
        // Reset any errors
        document.getElementById("searchOrigin").classList.remove('input-invalid');
        document.getElementById("searchDest").classList.remove('input-invalid');
        document.getElementById("searchStart").classList.remove('input-invalid');

        setMessage('');

        if (isObjectEmpty(origin) || isObjectEmpty(destination) || !validInput(document.getElementById("searchStart").value)) {
            setMessage('Missing a required field.');

            if (isObjectEmpty(origin)) {
                document.getElementById("searchOrigin").classList.add('input-invalid');
            }

            if (isObjectEmpty(destination)) {
                document.getElementById("searchDest").classList.add('input-invalid');
            }

            if (!validInput(document.getElementById("searchStart").value)) {
                document.getElementById("searchStart").classList.add('input-invalid');
            }

            return;
        } else {
            // Passed validation, reset any errors
            document.getElementById("searchOrigin").classList.remove('input-invalid');
            document.getElementById("searchDest").classList.remove('input-invalid');
            document.getElementById("searchStart").classList.remove('input-invalid');

            
            setMessage('');
        }

        // prepare api call
        let body = {};
        
        body.origin = [origin.lat, origin.lng];
        body.destination = [destination.lat, destination.lng];
        body.poolDate = new Date(document.getElementById("searchStart").value).toUTCString();

        async function runSearch() {
            // api call, update the pool
            fetch(`https://u-ride-cop4331.herokuapp.com/carpool/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(json => setSearchData(json, runSearch))
            .then(() => { clearForm(); closeModal() })
            .catch(error => { console.error(error); setMessage('A network error occurred.') })
        }
        runSearch();
    }

    return (
        <div id="search-pool-modal" className="modal" style={style}> 
            <div className="modal-content">
                <h2 className="modal-header">Search Pool</h2>
                <hr className="separator" />
                <form className="modal-form" id="searchForm">
                    <span id="form-result">{message}</span>
                    <label htmlFor="searchOrigin" className="input-headers">Origin:</label>
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setOrigin({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="searchOrigin" />
                    <label htmlFor="searchDest" className="input-headers">Destination:</label>
                    <Autocomplete
                        apiKey={googleAPIKey}
                        onPlaceSelected={(place) => setDestination({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})}
                        options={{types: ['address'], componentRestrictions: {country: 'us'}, fields: ['geometry.location']}}
                        id="searchDest" />
                    <label htmlFor="searchStart" className="input-headers">Start Time:</label>
                    <input type="datetime-local" id="searchStart" />
                    <div className="modal-buttons">
                        <Button onClick={(e) => { e.preventDefault(); validateForm() }} text="Search" bgcolor="" color="" />
                        <Button onClick={(e) => { e.preventDefault(); clearForm(); closeModal() }} text="Cancel" bgcolor="" color="" />
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