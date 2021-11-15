import React, { useState } from 'react';
import TitleLogo from '../components/TitleLogo.js';
import Button from '../components/Button';
import Card from '../components/Card';
import Map from '../components/Map';
import '../styles/SearchResults.css';

export default function SearchResultsPage() {

    function goBack() {
        // Go back to Home page
    }

    return (
        <div className="search-results-container">
            <TitleLogo />
            <div className="row">
                <div className="left-column">
                    <Map />
                    <div className="buttonsDiv">
                        <Button onClick={() => goBack()} text="< Back" bgcolor="#0466c8" color="#FFFFFF" />
                    </div>
                </div>
                <div className="right-column">
                    <div className="results-header">Search Results</div>
                    <div className="poolsDiv">
                        <Card
                         name="Naton Limb"
                         origin="Starbucks"
                         destination="UCF"
                         currentPassengerCount="1"
                         passengerCap="5"
                         recurringDays={["Monday", "Tuesday"]} />
                    </div>
                </div>
            </div>
        </div>
    );
}