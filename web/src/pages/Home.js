import React, { useEffect, useState } from 'react';
import TitleLogo from '../components/TitleLogo.js'
import CreatePoolWindow from '../components/dashboard/CreatePoolWindow.js';
import SearchPoolWindow from '../components/dashboard/SearchPoolWindow.js';
import Button from '../components/Button'
import Card from '../components/Card'
import Map from '../components/Map'
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faBell, faUsers } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {

    // Use usestate to show modals
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [tabIdx, setTabIdx] = useState(0);
    const [riderData, setRiderData] = useState();
    const [driverData, setDriverData] = useState();
    const [notifData, setNotifData] = useState();

    function closeModal() {
        setShowCreate(false);
        setShowSearch(false);
    }

    function getClassFor(idx) {
        let cls = 'navButton';
        if (tabIdx == idx) {
            cls += ' selected';
        }
        return cls;
    }

    useEffect(() => {
        // call api end point to get all data
        // set rider and driver and notif data as a result of converting that data to cards
    }, []);
    
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
                        <button className={getClassFor(0)} onClick={() => setTabIdx(0)}><FontAwesomeIcon icon={faUsers} /></button>
                        <button className={getClassFor(1)} onClick={() => setTabIdx(1)}><FontAwesomeIcon icon={faCar} /></button>
                        <button className={getClassFor(2)} onClick={() => setTabIdx(2)}><FontAwesomeIcon icon={faBell} /></button>
                    </nav>
                    <div className="poolsDiv">
                        {tabIdx == 0 && <>
                        {/* {riderData} */}
                        {/* DUMMY CARDS == REMOVE */}
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" />
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" />
                        </>}
                        {tabIdx == 1 && <>
                            {driverData}
                        </>}
                        {tabIdx == 2 && <>
                            {notifData}
                        </>}
                    </div>
                    <Button text="Sign Out" bgcolor="#0466c8" color="#FFFFFF" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;