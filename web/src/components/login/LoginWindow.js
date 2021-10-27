import React, { useState } from 'react';
import Button from '../Button';
const sha256 = require('js-sha256');

function LoginWindow () {
    var loginEmail;
    var loginPassword;
    const [message, setMessage] = useState('');

    // Function that is called when login button is pressed
    const login = async event => {
        event.preventDefault();

        // Validate input fields
        if (!validateInput(loginEmail.value) || !validateInput(loginPassword.value)) {
            setMessage('Missing a field.');

            if (!validateInput(loginEmail.value)) {
                // Draw red border on input field
                document.getElementById("loginEmail").classList.add('input-invalid');
            }
            if (!validateInput(loginPassword.value)) {
                // Draw red border on input field
                document.getElementById("loginPassword").classList.add('input-invalid');
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
                <p id="form-result">{message}</p>
                <p className="input-headers">Email</p>
                <input type="email" id="loginEmail" placeholder="Email" ref={(c) => loginEmail = c} /><br />
                <p className="input-headers">Password</p>
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <Button text="Log In" />
                <br />
            </form>
            <a href="/register.html" onclick="" className="hyperlink" id="registerLink">Register an account</a><br />
            <a href="/register.html" className="hyperlink" id="forgotPasswordLink">Forgot Password?</a>
        </div>
    );
}

// Validates a string
function validateInput (input) {
    if (input == undefined || input == "") {
        return 0;
    }
    else {
        // Valid input
        return 1;
    }
}

export default LoginWindow;