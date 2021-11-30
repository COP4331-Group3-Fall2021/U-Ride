import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';


export default function EditPoolWindow({ closeModal, showEdit, originalInfo}) {

    // use UseState
    const [message, setMessage] = useState('');

    let style = showEdit ? { display: 'flex' } : { display: 'none' }

    const passengerChkBx = originalInfo.riders.map((passenderID, idx) => {
        return <div className="checkboxes">
            <input type="checkbox" value={passenderID} id={'passenger' + idx} checked={true} className="check" />
            <label htmlFor={'passenger' + idx}>{passenderID}</label>
        </div>
    });

    function latLongToStr(latLongObj) {
        let present = latLongObj && latLongObj.lat !== undefined && latLongObj.lng !== undefined;
        return present ? `${latLongObj.lat} x ${latLongObj.lng}` : JSON.stringify(latLongObj);
    }

    return (
        <div id="create-pool-modal" className="modal" style={style}>
            <div className="modal-content">
                <h2 className="modal-header">Edit Pool</h2>
                <hr className="separator" />
                <form className="modal-form">
                    <span id="form-result">{message}</span>
                    <label htmlFor="createOrigin" className="input-headers">Origin:</label>
                    <input type="text" id="createOrigin" placeholder="Origin" value={latLongToStr(originalInfo.origin)}/>
                    <label htmlFor="createDest" className="input-headers">Destination:</label>
                    <input type="text" id="createDest" placeholder="Destination" value={latLongToStr(originalInfo.destination)}/>
                    <label htmlFor="maxPassengers" className="input-headers">Max Passengers:</label>
                    <input type="number" id="maxPassengers" placeholder="Max Passengers" min="1" max="7" value={originalInfo.maxParticipants} />
                    <label htmlFor="createStart" className="input-headers">Start Time:</label>
                    <input type="datetime-local" id="createStart" value={originalInfo.poolDate}/> 

                    {/* check boxes */}
                    <div id="checkContainer">
                        <div className="checkDiv-edit">
                            <span><u>Passengers:</u></span>
                            { passengerChkBx }
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <Button text="Save" bgcolor="" color="" />
                        <Button onClick={(e) => { e.preventDefault(); closeModal() }} text="Cancel" bgcolor="" color="" />
                        <Button text="Delete" bgcolor="#FF7575 " color="#000000" />
                    </div>
                </form>
            </div>
        </div>
    );
}