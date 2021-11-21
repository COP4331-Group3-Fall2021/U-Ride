import React, { useState } from 'react';
import TitleLogo from '../components/TitleLogo'
import LoginWindow from '../components/login/LoginWindow';
import RegisterWindow from '../components/login/RegisterWindow';
import '../styles/Splash.css';
import { ReactComponent as Car } from '../images/car.svg';
import Star from '../images/decoration-star.svg';
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
    return (
        <div className="splash-container">
            <img className="star1" src={Star} />
            <img className="star2" src={Star} />
            <TitleLogo />
            <div className="splash-row">
                <div className="left-column">
                    <p className="splash-page-paragraph">Start reducing emissions and making friends with a college&#8209;focused carpool app.</p>
                    <Car style={{width: 800}} className="splash-page-img"/>
                </div>
                <div className="right-column">
                    {showLogin && <LoginWindow goToRegister={() => goToRegister()}
                                               goToForgotPassword={() => goToForgotPassword()}/>}
                    {showRegister && <RegisterWindow goToLogin={() => goToLogin()}
                                               goToForgotPassword={() => goToForgotPassword()}/>}
                    {showForgotPassword && <ForgotPasswordWindow goToLogin={() => goToLogin()}
                                                                 goToRegister={() => goToRegister()}/>}
                </div>
            </div>
        </div>
    );
}