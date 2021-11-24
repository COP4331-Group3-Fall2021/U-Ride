import React, { useState } from 'react';
import Button from '../Button';
import { useHistory } from 'react-router-dom';
const sha256 = require('js-sha256');

export default function LoginWindow ({goToRegister, goToForgotPassword}) {
    // Used to redirect to pages
    const history = useHistory();

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
        
        // Hash password, then construct HTTP request
        var hash = sha256(loginPassword.value);
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
            email:loginEmail.value,
            password:hash
        });
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: requestBody,
            redirect: 'follow'
        };

        // Send Login API request and handle server response
        fetch('https://u-ride-cop4331.herokuapp.com/auth/login', requestOptions)
            .then(response => response.text())
            .then(result => {
                // Handle error messages
                if (result === 'EMAIL_NOT_FOUND') {
                    setMessage('Account does not exist.');
                }
                else if (result === 'INVALID_PASSWORD') {
                    setMessage('Invalid login.');
                }
                // Handle success
                else {
                    let responseBody = JSON.parse(result);
                    let userInfo = {firstName:responseBody.name.firstName, lastName:responseBody.name.lastName, userID:responseBody._id}
                    setMessage('');

                    // Set user info into local storage
                    localStorage.setItem('user_data', JSON.stringify(userInfo));

                    // Redirect user to homepage
                    history.push('/home');
                }
            })
            .catch(error => console.error('error', error));
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