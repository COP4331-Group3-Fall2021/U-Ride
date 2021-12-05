
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = "https://u-ride-cop4331.herokuapp.com/"
// const baseUrl = "localhost:3200/"
chai.use(chaiHttp);
describe("Carpool ", function(){
    it('create carpool', function(done) {
    chai.request(baseUrl)
    .post('carpool/create')
    .send({
            "_id": "string",
            "numParticipants": 0,
            "maxParticipants": 3,
            "poolDate": "2021-07-25T14:10:26.113Z",
            "origin" :[ 0,0],
            "destination": [0,0],
            "riders": [],
            "driver": 
              {
                  "_id": "61a402093a4dba0022a93cb2",
                  "name":
                      {
          
                          "first": "Victoria",
                          "last": "Williamson"
                      }
              },
            "isFull": false,
            "testing": true
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });
});

// Ellie
it('find carpool', function(done) {
    chai.request(baseUrl)
    .post('carpool/find')
    .send({
        "_id": "string",
        "numParticipants": 2,
        "maxParticipants": 3,
        "poolDate": "2021-11-18T21:27:12+0000",
        "origin": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "destination": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "riders": [
          [
            "6196c6217dcae90022e067e8",
            "6196c6457dcae90022e067e9"
          ]
        ],
        "driver": {
          "_id": "6196c6627dcae90022e067ea",
          "name": {
            "firstName": "test",
            "lastName": "user"
          }
        },
        "isFull": false
      })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });

});

// Vic
it('find rides', function(done){

})

// Ellie
it('find drives', function(done)
{
    chai.request(baseUrl)
    .post('carpool/findDrives')
    .send( {
        "_id": "string",
        "numParticipants": 2,
        "maxParticipants": 3,
        "poolDate": "2021-11-18T21:27:12+0000",
        "origin": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "destination": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "riders": [
          [
            "6196c6217dcae90022e067e8",
            "6196c6457dcae90022e067e9"
          ]
        ],
        "driver": {
          "_id": "6196c6627dcae90022e067ea",
          "name": {
            "firstName": "test",
            "lastName": "user"
          }
        },
        "isFull": false
      })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });

})

// Vic
it('join carpool', function(done)
{

})

// Ellie
it('update carpool', function(done)
{
    chai.request(baseUrl)
    .post('carpool/update')
    .send( {
        "_id": "string",
        "numParticipants": 2,
        "maxParticipants": 3,
        "poolDate": "2021-11-18T21:27:12+0000",
        "origin": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "destination": [
          [
            "longitude",
            "latitude"
          ]
        ],
        "riders": [
          [
            "6196c6217dcae90022e067e8",
            "6196c6457dcae90022e067e9"
          ]
        ],
        "driver": {
          "_id": "6196c6627dcae90022e067ea",
          "name": {
            "firstName": "test",
            "lastName": "user"
          }
        },
        "isFull": false
      })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });

})

// Vic
it('leave carpool', function(done)
{

})

// Ellie
it('delete carpool', function(done) {
    chai.request(baseUrl)
    .post('carpool/delete')
    .send( {
        "_id": "string"
      })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });
});

})