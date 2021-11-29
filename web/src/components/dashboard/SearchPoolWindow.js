import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';


export default function SearchPoolWindow({closeModal, showSearch, setSearchData}) {

    // use UseState
    const [message, setMessage] = useState('');

    let style = showSearch ? {display: 'flex'} : {display: 'none'};

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
                    <label htmlFor="createOrigin" className="input-headers">Origin:</label>
                    <input type="text" id="createOrigin" placeholder="Origin" />
                    <label htmlFor="createDest" className="input-headers">Destination:</label>
                    <input type="text" id="createDest" placeholder="Destination" />
                    <label htmlFor="createStart" className="input-headers">Start Time:</label>
                    <input type="time" id="createStart" />

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