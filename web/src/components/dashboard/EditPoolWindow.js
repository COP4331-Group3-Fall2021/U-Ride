import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';


export default function EditPoolWindow({ closeModal, showEdit, passengers = ["cat", "dog", "person"] }) {

    // use UseState
    const [message, setMessage] = useState('');

    let style = showEdit ? { display: 'flex' } : { display: 'none' }

    const passengerChkBx = passengers.map((passengerName, idx) => {
        return <div className="checkboxes">
            <input type="checkbox"  value={passengerName} id={'passenger' + idx} className="check" />
            <label htmlFor={'passenger' + idx}>{passengerName}</label>
        </div>
    });

    return (
        <div id="create-pool-modal" className="modal" style={style}>
            <div className="modal-content">
                <h2 className="modal-header">Edit Pool</h2>
                <hr className="separator" />
                <form className="modal-form">
                    <span className="form-result">{message}</span>
                    <label htmlFor="createOrigin" className="input-headers">Origin:</label>
                    <input type="text" id="createOrigin" placeholder="Origin" />
                    <label htmlFor="createDest" className="input-headers">Destination:</label>
                    <input type="text" id="createDest" placeholder="Destination" />
                    <label htmlFor="maxPassengers" className="input-headers">Max Passengers:</label>
                    <input type="number" id="maxPassengers" placeholder="Max Passengers" min="1" max="7" />
                    <label htmlFor="createStart" className="input-headers">Start Time:</label>
                    <input type="time" id="createStart" />

                    {/* check boxes */}
                    <div id="checkContainer">
                        <div className="checkDiv-edit">
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