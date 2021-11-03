import React, { useState } from 'react';
import Button from '../Button';

export default function ForgotPasswordWindow ({goToLogin, goToRegister}) {
    var forgotPasswordEmail;
    const [message, setMessage] = useState('');

    // Function that is called when login button is pressed
    const recover = async event => {
        event.preventDefault();
        document.getElementById("form-result").classList.add('form-result');
        document.getElementById("form-result").classList.remove('fgtpwd-success');

        // Validate input fields
        if (!validateInput(forgotPasswordEmail.value)) {
            setMessage('Missing a field.');
            // Draw red border on input field
            document.getElementById("forgotpasswordEmail").classList.add('input-invalid');
            return;
        } else {
            // Passed validation
            document.getElementById("forgotpasswordEmail").classList.remove('input-invalid');
            setMessage('');
        }
        
        // Construct request body
        var obj = {email:forgotPasswordEmail.value};
        var json = JSON.stringify(obj);

        // Send API request: Forgot Password
        try {
            const response = await fetch('https://u-ride-cop4331.herokuapp.com/api/forgotpassword',
                {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            // Check if email is a valid account; syntax based on Firebase docs
            if (res.error.message === 'EMAIL_NOT_FOUND') {
                setMessage('Account does not exist.');
            }
            else {
                // Clear error and input fields
                setMessage('Please check your email.');
                document.getElementById("form-result").classList.remove('form-result');
                document.getElementById("form-result").classList.add('fgtpwd-success');
            }
        }
        catch(e) {
            alert(e.toString());
            return;
        }    
    }

    return (
        <div id="forgotpassword-box">
            <h2 className="splash-window-title">Recover Account</h2>
            <form onSubmit={recover}> 
                <p id="form-result" class="form-result">{message}</p>
                <p className="input-headers">Email</p>
                <input type="email" id="forgotpasswordEmail" placeholder="Email" ref={(c) => forgotPasswordEmail = c} /><br />
                <Button text="Reset Password" className="action-button"/>
                <br />
            </form>
            <button onClick={goToLogin} className="hyperlink">Log In</button>
            <button onClick={goToRegister} className="hyperlink">Register an Account</button>
        </div>
    );
}

// Validates a string
function validateInput (input) {
    if (input === undefined || input === "") {
        return 0;
    }
    else {
        // Valid input
        return 1;
    }
}