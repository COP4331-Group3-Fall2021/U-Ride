import React, { useState } from 'react';
import Button from '../Button';

function LoginWindow () {
    let loginName;
    let loginPassword;
    const [message, setMessage] = useState('');

    const [email, setEmail] = useState();

    const login = async event => {
        event.preventDefault();

        var obj = {login:loginName.value, password:loginPassword.value};
        var json = JSON.stringify(obj);

        try {
            const response = await fetch('https://u-ride-cop4331.herokuapp.com/api/login',
                {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('Invalid login');
            }
            else {
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

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
                <p id="form-result">{message}Invalid login [test]</p>
                <input type="text" id="loginName" placeholder="Email" ref={(c) => loginName = c} onChange={e => setEmail(e.target.value)} /><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <Button text="Log In" />
                <br />
            </form>
            <a href="/register.html" className="hyperlink" id="registerLink">Register an account</a><br />
            <a href="/register.html" className="hyperlink" id="forgotPasswordLink">Forgot Password?</a>
        </div>
    );
}

export default LoginWindow;

// <input type="submit" id="loginButton" className="buttons" value="Log In" onClick={login} />