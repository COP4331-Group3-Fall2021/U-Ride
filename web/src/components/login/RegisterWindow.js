import React, { useState } from 'react';
import Button from '../Button';
import { useHistory } from 'react-router-dom';
const sha256 = require('js-sha256');

export default function RegisterWindow ({goToLogin, goToForgotPassword}) {
    // Used to redirect to pages
    const history = useHistory();

    var firstName;
    var lastName;
    var email;
    var password;
    var confirmPassword;
    const [message, setMessage] = useState('');
    
    // Function that is called when register button is pressed
    const register = async event => {
        event.preventDefault();

        // Validate input fields
        if (!validateInput(firstName.value) ||!validateInput(lastName.value) ||!validateInput(email.value) || !validateInput(password.value) || !validateInput(confirmPassword.value)) {
            setMessage('Missing a field.');

            if (!validateInput(firstName.value)) {
                document.getElementById("registerFirstName").classList.add('input-invalid');
            } else {
                document.getElementById("registerFirstName").classList.remove('input-invalid');
            }
            if (!validateInput(lastName.value)) {
                document.getElementById("registerLastName").classList.add('input-invalid');
            } else {
                document.getElementById("registerLastName").classList.remove('input-invalid');
            }
            if (!validateInput(email.value)) {
                document.getElementById("registerEmail").classList.add('input-invalid');
            } else {
                document.getElementById("registerEmail").classList.remove('input-invalid');
            }
            if (!validateInput(password.value)) {
                document.getElementById("registerPassword").classList.add('input-invalid');
            } else {
                document.getElementById("registerPassword").classList.remove('input-invalid');
            }
            if (!validateInput(confirmPassword.value)) {
                document.getElementById("registerConfirmPassword").classList.add('input-invalid');
            } else {
                document.getElementById("registerConfirmPassword").classList.remove('input-invalid');
            }
            return;
        } else {
            setMessage('');
        }
        if (password.value !== confirmPassword.value) {
            setMessage('Passwords must match.');
            document.getElementById("registerPassword").classList.add('input-invalid');
            document.getElementById("registerConfirmPassword").classList.add('input-invalid');
            return;
        } else {
            setMessage('');
            document.getElementById("registerPassword").classList.remove('input-invalid');
            document.getElementById("registerConfirmPassword").classList.remove('input-invalid');
        }
        if (password.value.length < 6) {
            setMessage('Password should be at least 6 characters.');
            document.getElementById("registerPassword").classList.add('input-invalid');
        } else {
            setMessage('');
            document.getElementById("registerPassword").classList.remove('input-invalid');
        }
        
        // Construct HTTP request
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
            name:{
                firstName:firstName.value,
                lastName:lastName.value
            },
            email:email.value,
            password:password.value
        });
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: requestBody,
            redirect: 'follow'
        };

        // Send Register API request and handle server response
        fetch('https://u-ride-cop4331.herokuapp.com/auth/register', requestOptions)
            .then(response => response.text())
            .then(result => {
                // Handle error messages
                if (result === 'EMAIL_EXISTS') {
                    setMessage('Account already exists.');
                }
                else if (result === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    setMessage("You're being rate limited.");
                }
                // Handle success
                else {
                    let responseBody = JSON.parse(result);
                    setMessage('');
                    // Return user to login window
                    goToLogin();
                }
            })
            .catch(error => console.error('error', error));
    }

    return (
        <div id="register-box">
            <h2 className="splash-window-title">Register</h2>
            <form onSubmit={register}> 
                <p id="form-result">{message}</p>
                <p className="input-headers">First Name</p>
                <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
                <p className="input-headers">Last Name</p>
                <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
                <p className="input-headers">Email</p>
                <input type="text" id="registerEmail" placeholder="Email" ref={(c) => email = c} /><br />
                <p className="input-headers">Password</p>
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => password = c} /><br />
                <p className="input-headers">Confirm Password</p>
                <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" ref={(c) => confirmPassword = c} /><br />
                <Button text="Register" />
                <br />
            </form>
            <button onClick={goToLogin} className="hyperlink">Log In</button>
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