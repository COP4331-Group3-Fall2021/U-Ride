import React, { useState } from 'react';
import Button from '../Button';
const sha256 = require('js-sha256');

function RegisterWindow ({goToLogin, goToForgotPassword}) {
    var firstName;
    var lastName;
    var email;
    var password;
    const [message, setMessage] = useState('');
    
// Function that is called when register button is pressed
const register = async event => {
    event.preventDefault();

    // Validate input fields
    if (!validateInput(email.value) || !validateInput(password.value)) {
        setMessage('Missing a field.');

        if (!validateInput(email.value)) {
            document.getElementById("loginEmail").classList.add('error');
        }
        if (!validateInput(password.value)) {
            document.getElementById("loginPassword").classList.add('error');
        }
        return;
    } else {
        setMessage('');
    }
    
    // Hash password, then construct request body
    var hash = sha256(password.value);
    var obj = {email:email.value, password:hash};
    var json = JSON.stringify(obj);

    // Send API request: Login
    try {
        const response = await fetch('https://u-ride-cop4331.herokuapp.com/api/register',
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
        <div id="register-box">
            <h2 className="splash-window-title">Register</h2>
            <form onSubmit={register}> 
                <p id="form-result">{message}</p>
                <p className="input-headers">First</p>
                <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
                <p className="input-headers">Last</p>
                <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
                <p className="input-headers">Email</p>
                <input type="text" id="registerEmail" placeholder="Email" ref={(c) => email = c} /><br />
                <p className="input-headers">Password</p>
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => password = c} /><br />
                <p className="input-headers">Confirm Password</p>
                <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" ref={(c) => password = c} /><br />
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
        return 0;
    }
    else {
        // Valid input
        return 1;
    }
}

export default RegisterWindow;