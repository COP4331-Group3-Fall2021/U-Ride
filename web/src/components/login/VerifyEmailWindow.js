import React, { useState } from 'react';
import Button from '../Button';

export default function VerifyEmailWindow ({goToLogin}) {
    
    return (
        <div id="verifyemail-box">
            <h2 className="splash-window-title">Verify Email</h2>
                <p className="verify-text">Please check your email to verify your account.</p>
                <Button text="Back To Login" className="action-button" onClick={goToLogin}/>
                <br />
        </div>
    );
}