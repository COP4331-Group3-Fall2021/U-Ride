import React, { useState } from 'react';
import TitleLogo from '../components/TitleLogo'
import LoginWindow from '../components/login/LoginWindow';
import RegisterWindow from '../components/login/RegisterWindow';
import '../styles/Splash.css';
import { ReactComponent as Car } from '../images/car.svg';
import ForgotPasswordWindow from '../components/login/ForgotPasswordWindow';

export default function SplashPage() {
    // Use useState to switch login modals.
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    function goToLogin() {
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
    }

    function goToRegister() {
        setShowLogin(false);
        setShowRegister(true);
        setShowForgotPassword(false);
    }

    function goToForgotPassword() {
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
    }

    // The "&#8209;" character is necessary to prevent word wrap
    return ( <
        div className = "splash-format" >
        <
        div className = "background" / >
        <
        TitleLogo / >
        <
        div className = "content-wrapper" > { /*Informational Text and Image*/ } <
        div className = "column-wrap" >
        <
        p className = "splash-page-paragraph " > Start reducing emissions and making friends with a college & #8209;focused carpool app.</p>
                    <Car style= {
            { width: "100%" }
        }
        className = "" / >
        <
        /div> { / * Log in Div * / } <
        div className = "column-wrap" >
        <
        div className = "login" > {
            showLogin && < LoginWindow goToRegister = {
                () => goToRegister()
            }
            goToForgotPassword = {
                () => goToForgotPassword()
            }
            />} {
            showRegister && < RegisterWindow goToLogin = {
                () => goToLogin()
            }
            goToForgotPassword = {
                () => goToForgotPassword()
            }
            />} {
            showForgotPassword && < ForgotPasswordWindow goToLogin = {
                () => goToLogin()
            }
            goToRegister = {
                () => goToRegister()
            }
            />} < /
            div > <
            /div> < /
            div > <
            /div>
        );
    }