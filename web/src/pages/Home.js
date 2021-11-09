import React, { useState } from 'react';
import TitleLogo from '../components/TitleLogo.js'
import CreatePoolWindow from '../components/dashboard/CreatePoolWindow.js';
import SearchPoolWindow from '../components/dashboard/SearchPoolWindow.js';
import Button from '../components/Button'
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faBell, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Rider } from '../images/rider.svg';
import { ReactComponent as Driver } from '../images/driver.svg';
import { ReactComponent as Notif } from '../images/notif.svg';

const HomePage = () => {

    // Use usestate to show modals
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    function closeModal() {
        setShowCreate(false);
        setShowSearch(false);
    }

    return (
        <div className="container">
            <TitleLogo />
            <CreatePoolWindow closeModal={closeModal} showCreate={showCreate}/>
            <SearchPoolWindow closeModal={closeModal} showSearch={showSearch}/>
            <div className="row">
                <div className="left-column-home">
                    <div className="mapDiv">
                        {/* PUT MAP HERE */}
                    </div>
                    <div className="buttonsDiv">
                        <Button onClick={() => setShowCreate(true)} text="Create Pool" bgcolor="#0466c8" color="#FFFFFF" />
                        <Button onClick={() => setShowSearch(true)} text="Search Pool" bgcolor="#0466c8" color="#FFFFFF" />
                    </div>
                </div>
                <div className="right-column-home">
                    <nav id="navBar">
                        {/* <button className="navButton"><Rider /></button>
                        <button className="navButton"><Driver /></button>
                    <button className="navButton"><Notif /></button> */}
                        <button className="navButton"><FontAwesomeIcon icon={faUsers} /></button>
                        <button className="navButton"><FontAwesomeIcon icon={faCar} /></button>
                        <button className="navButton"><FontAwesomeIcon icon={faBell} /></button>
                    </nav>
                    <div className="poolsDiv">

                    </div>
                    <Button text="Sign Out" bgcolor="#0466c8" color="#FFFFFF" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;