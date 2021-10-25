import React from 'react';
import TitleLogo from '../components/TitleLogo'
import LoginWindow from '../components/login/LoginWindow';
import '../styles/Splash.css';
import { ReactComponent as Car } from '../images/car.svg';

const SplashPage = () => {
    return (
        <div className="splash-container">
            <TitleLogo />
            <div className="splash-row">
                <div className="column" id="left">
                    <p className="splash-page-paragraph">Start reducing emissions and making friends with a college-focused carpool app.</p>
                    <Car style={{width: 600, height: 500}}/>
                </div>
                <div className="column" id="right">
                    <LoginWindow />
                </div>
            </div>
        </div>
    );
}

export default SplashPage;