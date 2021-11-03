const mongoClient = require('mongodb').MongoClient;


var _db;

function connect(callback){
    mongoClient.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        _db = db;
        callback();
    });
        
}
function get(){
    return _db;
}

function close(){
    _db.close();
}

module.exports = {
    connect,
    get,
    close
};
