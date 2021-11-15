const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoUtil = require("./mongoUtil");


require('dotenv').config();

const PORT = process.env.PORT || 5000; 

const app = express();
app.set('port', PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {  
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'web', 'build')));
    app.get('/', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));  
    });
}

// Dynamically load in API endpoints
const endpoints = fs.readdirSync(path.join(__dirname, 'api')).filter(file => file.endsWith('.js'));
for (const file of endpoints) {
    let endpoint = require(path.join(__dirname, 'api', file));
    app.use('/api', endpoint);
}


// Creating /auth path 
const AuthAPI = require('./api/auth');
app.use('/auth', AuthAPI);

// Creating /carpool path 
const CarpoolAPI = require('./api/carpool');
app.use('/carpool', CarpoolAPI);

mongoUtil.connect(() => {
    app.listen(PORT, () => console.log('Server listening on port ' + PORT));
})
