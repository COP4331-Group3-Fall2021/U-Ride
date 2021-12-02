
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
})