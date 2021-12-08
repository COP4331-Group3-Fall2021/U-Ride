import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/Modal.css';

export default function ConfirmModal({ closeModal, showConfirm, data }) {

    let style = showConfirm ? { display: 'flex' } : { display: 'none' }

    return (
        <div id="confirm-modal" className="modal" style={style}>
            <div className="modal-content">
                <h2 className="modal-header">Confirmation</h2>
                <hr className="separator" />
                <span className="confirm-message">Are you sure you want to {data.text} this carpool?</span>
                {/* {data.text.charAt(0).toUpperCase() + data.text.slice(1)} */}
                <div className="modal-buttons">
                    <Button onClick={(e) => { data.action(); closeModal() }} text="Yes" bgcolor="" color="" ></Button>
                    <Button onClick={(e) => { closeModal() }} text="No" bgcolor="" color="" ></Button>
                </div>
            </div>
        </div>
    );

}
