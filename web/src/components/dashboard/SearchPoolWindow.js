import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';
import Autocomplete from "react-google-autocomplete";

export default function SearchPoolWindow({closeModal, showSearch, setSearchData}) {

    const googleAPIKey = "AIzaSyB-1ftwBLZ1yoznFm4_pB-i3wqCnecSirY";

    // use UseState
    const [message, setMessage] = useState('');
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});

    let style = showSearch ? {display: 'flex'} : {display: 'none'};

    // Validate form fields
    function validateForm() {
        
        // Reset any errors
        document.getElementById("searchOrigin").classList.remove('input-invalid');
        document.getElementById("searchDest").classList.remove('input-invalid');
        setMessage('');

        if (isObjectEmpty(origin) || isObjectEmpty(destination)) {
            setMessage('Missing a required field.');

            if (isObjectEmpty(origin)) {
                document.getElementById("createOrigin").classList.add('input-invalid');
            }

            if (isObjectEmpty(destination)) {
                document.getElementById("createDest").classList.add('input-invalid');
            }
            return;
        } else {
            // Passed validation, reset any errors
            document.getElementById("searchOrigin").classList.remove('input-invalid');
            document.getElementById("searchDest").classList.remove('input-invalid');
            setMessage('');
        }

        // Perform search after validation
        /* 
         * search()
         */
    }

    function search(element) {
        // dont submit the form
        element.preventDefault();

        // call api end point (using fetch)
        // on success, generate the Cards for the resulting data, close this modal, then update the data with setSearchData
    }

    return (
        <div id="search-pool-modal" className="modal" style={style}> 
            <div className="modal-content">
                <h2 className="modal-header">Search Pool</h2>
                <hr className="separator" />
                <form className="modal-form">
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
                    <input type="time" id="searchStart" />

                    {/* check boxes */}
                    <div className="checkDiv">
                        <div className="checkboxes">
                            <input type="checkbox" value="Monday" id="mondayCheck" className="check" />
                            <label htmlFor="mondayCheck">Monday</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" value="Tuesday" id="tuesdayCheck" className="check" />
                            <label htmlFor="tuesdayCheck">Tuesday</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" value="Wednesday" id="wednesdayCheck" className="check" />
                            <label htmlFor="wednesdayCheck">Wednesday</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" value="Thursday" id="thursdayCheck" className="check" />
                            <label htmlFor="thursdayCheck">Thursday</label>
                        </div>
                        <div className="checkboxes">
                            <input type="checkbox" value="Friday" id="fridayCheck" className="check" />
                            <label htmlFor="fridayCheck">Friday</label>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <Button onClick={search} text="Search" bgcolor="" color="" />
                        <Button onClick={(e) => {e.preventDefault(); closeModal()}} text="Cancel" bgcolor="" color="" />
                    </div>
                </form>
            </div>
        </div>
    );
}

// Check if an object is empty
function isObjectEmpty(input) {
    return input && Object.keys(input).length === 0 && Object.getPrototypeOf(input) === Object.prototype;
}