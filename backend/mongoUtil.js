const MongoClient = require( 'mongodb' ).MongoClient;

var _db;
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

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