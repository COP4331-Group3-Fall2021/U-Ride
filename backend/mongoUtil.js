const MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

  connectToServer: async function connectDb (){
	const uri = process.env.DATABASE_URI;
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        _db = client.db().admin();
     
    } catch (e) {
        console.error(e);
    }
    finally {
        console.log("Database has been connected");
        await client.close();
    }
},

  getDb: function() {
    return _db;
  }
};