import React, { useEffect, useState } from 'react'
import TitleLogo from '../components/TitleLogo'
import CreatePoolWindow from '../components/dashboard/CreatePoolWindow'
import SearchPoolWindow from '../components/dashboard/SearchPoolWindow'
import EditPoolWindow from '../components/dashboard/EditPoolWindow'
import Button from '../components/Button'
import Card from '../components/Card'
import { useHistory } from 'react-router-dom';
import Map from '../components/Map'
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons'

function riderDataToReact(dataArray) {
    console.log(dataArray);
    let cards = dataArray?.length > 0 && dataArray.map((data, i) => {
        let isoDate = new Date(data.poolDate);
        
        let name = data.driver; // TODO
        let date = `${isoDate.getMonth()}/${isoDate.getDay()}/${isoDate.getYear()}`;
        let time = `${isoDate.getHours() % 12 + 1}:${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
        let origin = data.origin.coordinates; // TODO
        let destination = data.detination.coordinates; // TODO
        let currPassCount = data.numParticipants;
        let passCap = data.maxParticipants;
        let buttonName = "Join";
        let passengers = data.riders; // TODO
        return <Card name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={buttonName} passengers={passengers} />
    });

    // if no cards, show no results
    if (!cards) {
        return (
            <>
                <h3 className="no-results">You are not riding in any carpools.</h3>
            </>
        )
    }

    return (
        <>
            {cards}
        </>
    )
}

function driverDataToReact(dataArray) {
    console.log(dataArray);
    let cards = dataArray?.length > 0 && dataArray.map((data, i) => {
        let isoDate = new Date(data.poolDate);
        
        let name = `${data.driver.name.first} ${data.driver.name.last}`;
        let date = `${isoDate.getMonth()}/${isoDate.getDay()}/${isoDate.getYear()}`;
        let time = `${isoDate.getHours() % 12 + 1}:${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
        let origin = data.origin.coordinates; // TODO
        let destination = data.detination.coordinates; // TODO
        let currPassCount = data.numParticipants;
        let passCap = data.maxParticipants;
        let buttonName = "Edit";
        let passengers = data.riders; // TODO
        return <Card name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={buttonName} passengers={passengers} />
    });

    // if no cards, show no results
    if (!cards) {
        return (
            <>
                <h3 className="no-results">You are not driving any carpools.</h3>
            </>
        )
    }

    return (
        <>
            {cards}
        </>
    )
}

const HomePage = () => {

    // States for Card->Map interactions
    const [origin, setOrigin] = useState({lat: null, lng: null});
    const [destination, setDestination] = useState({lat: null, lng: null});
    function updateMap(origin, destination) {
        setOrigin(origin);
        setDestination(destination);
    }

    // Use usestate to show modals
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [tabIdx, setTabIdx] = useState(1);
    const [riderData, setRiderData] = useState(<></>);
    const [driverData, setDriverData] = useState(<></>);
    const [searchData, setSearchData] = useState(<></>);

    const history = useHistory();

    function closeModal() {
        setShowCreate(false);
        setShowSearch(false);
        setShowEdit(false);
    }

    function getClassFor(idx) {
        let cls = 'navButton';
        if (tabIdx === idx) {
            cls += ' selected';
        }
        return cls;
    }

    function loadRiderData() {
        let user = JSON.parse(localStorage.getItem('user_data'));
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/findRides/${user.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(j => riderDataToReact(j))
        .then(data => setRiderData(data))
        .catch(error => console.error(error))
    }

    function loadDriverData() {
        let user = JSON.parse(localStorage.getItem('user_data'));
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/findDrives/${user.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(j => driverDataToReact(j))
        .then(data => setDriverData(data))
        .catch(error => console.error(error))
    }

    // initialize rider & driver pool data on component load
    useEffect(() => {
        loadRiderData();
        loadDriverData();
    }, []);

    function signout() {
        localStorage.setItem('user_data', "");
        // Redirect user to homepage
        history.push('/');
    }

    return (
        <div className="container">
            <TitleLogo />
            <CreatePoolWindow closeModal={closeModal} showCreate={showCreate}/>
            <SearchPoolWindow closeModal={closeModal} showSearch={showSearch} setSearchData={setSearchData}/>
            <EditPoolWindow closeModal={closeModal} showEdit={showEdit}/>
            <div className="row">
                <div className="left-column-home">
                    <div className="mapDiv">
                        <Map origin={origin} destination={destination}/>
                    </div>
                    <div className="buttonsDiv">
                        <Button onClick={() => setShowCreate(true)} text="Create Pool" bgcolor="#007EA7" color="#FFFFFF" />
                    </div>
                </div>
                <div className="right-column-home">
                    <nav id="navBar">
                        <button title="Search Pools" className={getClassFor(0)} onClick={() => { setTabIdx(0); setSearchData(<></>); setShowSearch(true) }}><FontAwesomeIcon icon={faSearch} /></button>
                        <button title="Riding Pools" className={getClassFor(1)} onClick={() => setTabIdx(1)}><FontAwesomeIcon icon={faUsers} /></button>
                        <button title="Driving Pools" className={getClassFor(2)} onClick={() => setTabIdx(2)}><FontAwesomeIcon icon={faCar} /></button>
                    </nav>
                    <div className="poolsDiv">
                        {tabIdx === 0 && <>
                        {/* DUMMY CARDS == REMOVE */}
                            {searchData}
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" buttonName="Join" passengers={['Hannah Montana', 'Lizzy McGuire', 'Raven Simone']} />
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" buttonName="Join" passengers={['Hannah Montana', 'Lizzy McGuire', 'Raven Simone']} />
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" buttonName="Join" passengers={['Hannah Montana', 'Lizzy McGuire', 'Raven Simone']} />
                            <Card name="John Doe" date="11/2/21" time="8:00pm" origin="123 Main St." destination="123 Main St." currentPassengerCount="2" passengerCap="4" buttonName="Join" passengers={['Hannah Montana', 'Lizzy McGuire', 'Raven Simone']} />
                        </>}
                        {tabIdx === 1 && <>
                        {/* DUMMY CARDS == REMOVE */}
                            {riderData}
                        </>}
                        {tabIdx === 2 && <>
                        {/* DUMMY CARDS == REMOVE */}
                            {driverData}
                            <Card name="TEST CARD" date="11/2/21" time="8:00pm" origin={{lat: 28.601027, lng: -81.205060}} destination={{lat: 28.61060555577089, lng: -81.21444511353575}} cardClick={(origin, destination) => updateMap(origin, destination)} currentPassengerCount="0" passengerCap="4" buttonName="Leave" passengers={[]} />
                        </>}
                    </div>
                    <Button text="Sign Out" bgcolor="#003459" color="#FFFFFF" onClick={signout}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;