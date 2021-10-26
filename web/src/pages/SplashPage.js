import React from 'react';
import TitleLogo from '../components/TitleLogo'
import LoginWindow from '../components/login/LoginWindow';
import '../styles/Splash.css';
import { ReactComponent as Car } from '../images/car.svg';

// The "&#8209;" character is necessary for to prevent word wrap
const SplashPage = () => {
    return (
        <div className="splash-container">
            <TitleLogo />
            <div className="splash-row">
                <div className="column" id="left">
                    <p className="splash-page-paragraph">Start reducing emissions and making friends with a college&#8209;focused carpool app.</p>
                    <Car style={{width: 800}} className="splash-page-img"/>
                </div>
                <div className="column" id="right">
                    <LoginWindow />
                </div>
            </div>
        </div>
    );
}

export default SplashPage;