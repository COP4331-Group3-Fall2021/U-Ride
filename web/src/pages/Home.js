import React, { useEffect, useState } from 'react';
import TitleLogo from '../components/TitleLogo';
import CreatePoolWindow from '../components/dashboard/CreatePoolWindow';
import SearchPoolWindow from '../components/dashboard/SearchPoolWindow';
import EditPoolWindow from '../components/dashboard/EditPoolWindow';
import ConfirmModal from '../components/dashboard/ConfirmModal';
import Button from '../components/Button';
import Card from '../components/Card';
import { useHistory } from 'react-router-dom';
import Map from '../components/Map';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {

    // States for Card->Map interactions
    const [origin, setOrigin] = useState({ lat: null, lng: null });
    const [destination, setDestination] = useState({ lat: null, lng: null });
    function updateMap(origin, destination) {
        setOrigin(origin);
        setDestination(destination);
    }

    // Use usestate to show modals
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currEdit, setCurrEdit] = useState({
        _id: "0",
        numParticipants: 0,
        maxParticipants: 0,
        poolDate: "2021-11-18T21:27:12+0000",
        origin: [0, 0],
        destination: [0, 0],
        riders: [],
        driver: {
            _id: "",
            name: {
                first: "",
                last: ""
            }
        },
        isFull: false
    });
    const [tabIdx, setTabIdx] = useState(1);
    const [riderData, setRiderData] = useState(<></>);
    const [driverData, setDriverData] = useState(<></>);
    const [searchData, setSearchData] = useState(<></>);
    const [confirmData, setConfirmData] = useState({
        text: '', 
        action: () => {}
    });

    // PUT for joining pool
    function joinPool(poolID) {
        const user = JSON.parse(localStorage.getItem('user_data'));
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/join/${poolID}/${user.userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok && loadRiderData())
            .catch(error => console.error(error))
    }

    // PUT for leaving pool
    function leavePool(poolID) {
        const user = JSON.parse(localStorage.getItem('user_data'));
        fetch(`https://u-ride-cop4331.herokuapp.com/carpool/leave/${poolID}/${user.userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok && loadRiderData())
            .catch(error => console.error(error))
    }

    function riderDataToReact(dataArray) {
        console.log("rider: ", dataArray);
        const cards = dataArray?.length > 0 && dataArray.map((data, i) => {
            const isoDate = new Date(data.poolDate);

            const name = `${data.driver.name?.first} ${data.driver.name?.last}`; // TODO
            const date = `${isoDate.getMonth() + 1}/${isoDate.getDate()}/${isoDate.getFullYear()}`;
            const time = `${isoDate.getHours() % 12 == 0 ? 12 : isoDate.getHours() % 12}:${isoDate.getMinutes() < 10 ? 0 : ''}${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
            const origin = { lat: data.origin[0], lng: data.origin[1] };
            const destination = { lat: data.destination[0], lng: data.destination[1] };
            const currPassCount = data.numParticipants;
            const passCap = data.maxParticipants;
            const buttonName = "Leave";
            const passengers = data.riders; // TODO

            const leave = () => {
                showConfirmModal('leave', () => leavePool(data._id));
            }

            return <Card key={data._id} name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={buttonName} passengers={passengers} buttonClick={leave} cardClick={(origin, destination) => updateMap(origin, destination)} />
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
        console.log("driver: ", dataArray);
        const cards = dataArray?.length > 0 && dataArray.map((data, i) => {
            const isoDate = new Date(data.poolDate);

            const name = `${data.driver.name.first} ${data.driver.name.last}`;
            const date = `${isoDate.getMonth() + 1}/${isoDate.getDate()}/${isoDate.getFullYear()}`;
            const time = `${isoDate.getHours() % 12 == 0 ? 12 : isoDate.getHours() % 12}:${isoDate.getMinutes() < 10 ? 0 : ''}${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
            const origin = { lat: data.origin[0], lng: data.origin[1] };
            const destination = { lat: data.destination[0], lng: data.destination[1] };
            const currPassCount = data.numParticipants;
            const passCap = data.maxParticipants;
            const buttonName = "Edit";
            const passengers = data.riders; // TODO

            const edit = () => {
                setCurrEdit(data);
                setShowEdit(true);
            }

            return <Card key={data._id} name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={buttonName} passengers={passengers} buttonClick={edit} cardClick={(origin, destination) => updateMap(origin, destination)} />
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

    // Set join button text based on pool data
    function getButtonName(data) {
        const user = JSON.parse(localStorage.getItem('user_data'));

        if (data.riders.includes(user.userID)) {
            return "Joined";
        }

        if (data.isFull) {
            return "Full";
        }

        return "Join";
    }

    function searchDataToReact(dataArray, regenCards) {
        console.log("search results: ", dataArray);

        const cards = dataArray?.length > 0 && dataArray.map((data, i) => {
            const isoDate = new Date(data.poolDate);

            const name = `${data.driver.name.first} ${data.driver.name.last}`;
            const date = `${isoDate.getMonth() + 1}/${isoDate.getDate()}/${isoDate.getFullYear()}`;
            const time = `${isoDate.getHours() % 12 == 0 ? 12 : isoDate.getHours() % 12}:${isoDate.getMinutes() < 10 ? 0 : ''}${isoDate.getMinutes()}${isoDate.getHours() >= 12 ? 'pm' : 'am'}`;
            const origin = { lat: data.origin[0], lng: data.origin[1] };
            const destination = { lat: data.destination[0], lng: data.destination[1] };
            const currPassCount = data.numParticipants;
            const passCap = data.maxParticipants;
            const buttonName = getButtonName(data);
            const passengers = data.riders; // TODO

            const join = () => {
                joinPool(data._id);
                setTimeout(regenCards, 250);
            }

            return <Card key={data._id} name={name} date={date} time={time} origin={origin} destination={destination} currentPassengerCount={currPassCount} passengerCap={passCap} buttonName={buttonName} passengers={passengers} buttonClick={join} cardClick={(origin, destination) => updateMap(origin, destination)} />
        });

        // if no cards, show no results
        if (!cards) {
            return (
                <>
                    <h3 className="no-results">No Search Results.</h3>
                </>
            )
        }

        return (
            <>
                {cards}
            </>
        )
    }


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
        const user = JSON.parse(localStorage.getItem('user_data'));
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
        const user = JSON.parse(localStorage.getItem('user_data'));
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

    function showConfirmModal(text, confirmAction) {
        setConfirmData({
            text: text,
            action: confirmAction
        });
        setShowConfirm(true);
    }

    return (
        <div className="container">
            <TitleLogo />
            <CreatePoolWindow closeModal={closeModal} showCreate={showCreate} refreshDriverData={loadDriverData} />
            <SearchPoolWindow closeModal={closeModal} showSearch={showSearch} setSearchData={(data, regenCards) => setSearchData(searchDataToReact(data, regenCards))} />
            <EditPoolWindow closeModal={closeModal} showEdit={showEdit} onConfirm={showConfirmModal} originalInfo={currEdit} refreshDriverData={loadDriverData} />
            <ConfirmModal closeModal={() => setShowConfirm(false)} showConfirm={showConfirm} data={confirmData} />
            <div className="row">
                <div className="left-column-home">
                    <div className="mapDiv">
                        <Map origin={origin} destination={destination} />
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
                            {searchData}
                        </>}
                        {tabIdx === 1 && <>
                            {riderData}
                        </>}
                        {tabIdx === 2 && <>
                            {driverData}
                        </>}
                    </div>
                    <Button text="Sign Out" bgcolor="#003459" color="#FFFFFF" onClick={signout} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;