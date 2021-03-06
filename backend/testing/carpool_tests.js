
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = "https://u-ride-cop4331.herokuapp.com/"

chai.use(chaiHttp);
describe("Carpool API Test ", function(){
    it('create carpool', function(done) {
    chai.request(baseUrl)
    .post('carpool/create')
    .send({
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
        carpool_id = res._id;
        done();
    });
});

// Ellie
it('find carpool', function(done) {
    chai.request(baseUrl)
    .get('carpool/find')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(err).to.be.null;
            expect(res.body[0]).to.have.property("numParticipants");
            expect(res.body[0]).to.have.property("maxParticipants");
            expect(res.body[0]).to.have.property("origin");
            expect(res.body[0]).to.have.property('destination');
            expect(res.body[0]).to.have.property("riders");
            expect(res.body[0]).to.have.property("driver");
            expect(res.body[0]).to.have.property('isFull');
            done();
        });
});

// Vic
it('find rides', function(done){
        chai.request(baseUrl)
        .get('carpool/findRides/61a402093a4dba0022a93cb2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(err).to.be.null;
            expect(res.body[0]).to.have.property("numParticipants");
            expect(res.body[0]).to.have.property("maxParticipants");
            expect(res.body[0]).to.have.property("origin");
            expect(res.body[0]).to.have.property('destination');
            expect(res.body[0]).to.have.property("riders");
            expect(res.body[0]).to.have.property("driver");
            expect(res.body[0]).to.have.property('isFull');
            done();
        });
});

// Ellie
it('find drives', function(done)
{
    chai.request(baseUrl)
    .get('carpool/findDrives/61a402093a4dba0022a93cb2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(err).to.be.null;
            expect(res.body[0]).to.have.property("numParticipants");
            expect(res.body[0]).to.have.property("maxParticipants");
            expect(res.body[0]).to.have.property("origin");
            expect(res.body[0]).to.have.property('destination');
            expect(res.body[0]).to.have.property("riders");
            expect(res.body[0]).to.have.property("driver");
            expect(res.body[0]).to.have.property('isFull');
            done();
        });
});

// Vic
it('join carpool', function(done)
{
// Vic

    chai.request(baseUrl)
    .get('carpool/join/61a9340fa8c2c466047c2d81/61a402093a4dba0022a93cb2')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        done();
    });
})

// Ellie
it('update carpool', function(done)
{
    chai.request(baseUrl)
    .put('carpool/update')
    .send( {
        "_id": "61a402093a4dba0022a93cb2",
        "numParticipants": 2,
        "maxParticipants": 3,
        "poolDate": "2021-11-18T21:27:12+0000",
        "origin": [ 0,0],
        "destination": [ 0,0],
        "riders": [
          [
            "6196c6217dcae90022e067e8",
            "6196c6457dcae90022e067e9"
          ]
        ],
        "driver": 
              {
                  "_id": "61a402093a4dba0022a93cb2",
                  "name":
                      {
          
                          "first": "Victoria",
                          "last": "Williamson"
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
        chai.request(baseUrl)
        .get('carpool/leave/61a9340fa8c2c466047c2d81/61a402093a4dba0022a93cb2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(err).to.be.null;
            done();
        });

});

// Ellie
it('delete carpool', function(done) {
    chai.request(baseUrl)
    .delete('carpool/delete')
    .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
    });
});

})