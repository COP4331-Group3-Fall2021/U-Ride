const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

// MongoDB stuff
const uri = "mongodb+srv://root:NNjSnwUieiom2UXV8LrkrH3Q0shhKW8h@u-ride.pi8bx.mongodb.net/uride?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect();

const PORT = process.env.PORT || 5000; 

const app = express();
app.set('port', PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

// Setting up auto swaggerhub documentation 
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'U-Ride API documentation',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  };
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
// Creating /api-docs path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Creating /auth path 
const AuthAPI = require('./api/auth');
app.use('/auth', AuthAPI);

app.listen(PORT, () => console.log('Server listening on port ' + PORT));