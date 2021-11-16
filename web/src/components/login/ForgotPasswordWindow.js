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
        
        // Construct HTTP request
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
            email:forgotPasswordEmail.value,
        });
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: requestBody,
            redirect: 'follow'
        };
        var obj = {email:forgotPasswordEmail.value};
        var json = JSON.stringify(obj);

        // Send Login API request and handle server response
        fetch('https://u-ride-cop4331.herokuapp.com/auth/emailreset', requestOptions)
        .then(response => response.text())
        .then(result => {
            // Handle error messages
            if (result === 'EMAIL_NOT_FOUND') {
                setMessage('Account does not exist.');
            }
            // Handle success
            else {
                setMessage('Please check your email.');
                document.getElementById("form-result").classList.remove('form-result');
                document.getElementById("form-result").classList.add('fgtpwd-success');
            }
        })
        .catch(error => console.error('error', error));
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