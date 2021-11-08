import React, { useState } from 'react';
import Button from '../Button';
const sha256 = require('js-sha256');

export default function LoginWindow ({goToRegister, goToForgotPassword}) {
    var loginEmail;
    var loginPassword;
    const [message, setMessage] = useState('');

    // Function that is called when login button is pressed
    const login = async event => {
        event.preventDefault();

        /* Check for the following input errors:
            - Invalid email (already covered by HTML5 form)
            - Blank email field
            - Blank password field
        */
        // Validate input fields
        if (!validateInput(loginEmail.value) || !validateInput(loginPassword.value)) {
            setMessage('Missing a field.');

            if (!validateInput(loginEmail.value)) {
                // Draw red border on input field
                document.getElementById("loginEmail").classList.add('input-invalid');
            } else {
                document.getElementById("loginEmail").classList.remove('input-invalid');
            }
            if (!validateInput(loginPassword.value)) {
                // Draw red border on input field
                document.getElementById("loginPassword").classList.add('input-invalid');
            } else {
                document.getElementById("loginPassword").classList.remove('input-invalid');
            }
            return;
        } else {
            // Passed validation
            document.getElementById("loginEmail").classList.remove('input-invalid');
            document.getElementById("loginPassword").classList.remove('input-invalid');
            setMessage('');
        }
        
        // Hash password, then construct request body
        var hash = sha256(loginPassword.value);
        var obj = {email:loginEmail.value, password:hash};
        var json = JSON.stringify(obj);

        // Send API request: Login
        try {
            const response = await fetch('https://u-ride-cop4331.herokuapp.com/api/login',
                {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            // Check if valid login
            if (res.id <= 0) {
                setMessage('Invalid login.');
            }
            else {
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                // Clear error and input fields
                setMessage('');
                window.location.href = '/home'; // !!!!!!!!!!!!!!!! This is important to note
            }
        }
        catch(e) {
            alert(e.toString());
            return;
        }    
    }

    return (
        <div id="login-box">
            <h2 className="splash-window-title">Log In</h2>
            <form onSubmit={login}> 
                <p className="form-result">{message}</p>
                <p className="input-headers">Email</p>
                <input type="email" id="loginEmail" placeholder="Email" ref={(c) => loginEmail = c} /><br />
                <p className="input-headers">Password</p>
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <Button text="Log In" className="action-button"/>
                <br />
            </form>
            <button onClick={goToRegister} className="hyperlink">Register an account</button>
            <button onClick={goToForgotPassword} className="hyperlink">Forgot Password?</button>
        </div>
    );
}

// Validates a string
function validateInput (input) {
    if (input === undefined || input === "") {
        return false;
    }
    else {
        // Valid input
        return true;
    }
}