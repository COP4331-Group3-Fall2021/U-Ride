const express = require('express');
const cors = require('cors');
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {  
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'web', 'build')));
    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));  
    });
}

app.listen(PORT, () => console.log('Server listening on port ' + PORT));


