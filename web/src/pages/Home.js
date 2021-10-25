import React from 'react';
import TitleLogo from '../components/TitleLogo.js'
import Button from '../components/Button'
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faBell, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Rider } from '../images/rider.svg';
import { ReactComponent as Driver } from '../images/driver.svg';
import { ReactComponent as Notif } from '../images/notif.svg';

const HomePage = () => {
    return (
        <div className="container">
            <TitleLogo />
            <div className="row">
                <div className="left-column">
                    <div className="mapDiv"> 
                    {/* PUT MAP HERE */}
                    </div>
                    <div className="buttonsDiv">
                        <Button text="Create Pool" />
                        <Button text="Search Pool" />
                    </div>
                </div>
                <div className="right-column">
                    <nav id="navBar">
                        {/* <button className="navButton"><Rider /></button>
                        <button className="navButton"><Driver /></button>
                        <button className="navButton"><Notif /></button> */}
                        <button className="navButton"><FontAwesomeIcon icon={faUsers}/></button>
                        <button className="navButton"><FontAwesomeIcon icon={faCar} /></button>
                        <button className="navButton"><FontAwesomeIcon icon={faBell}  /></button>
                    </nav>
                    <div className="poolsDiv">
                        <p> PLACE HOLDER </p>
                    </div>
                    <Button text="Sign Out" bgcolor="#ED7A7A" color="#FFFFFF" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;