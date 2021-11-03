const e = require("express");
const express = require("express");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoUtil");


// Create Carpool 
router.put("/insert", async (req, res) => {
    
    db = mongoUtil.get();
    db.db("root").collection("uride").insertOne(req.body, function (err, response) {
        if (err) 
        {
           console.log("Error", err);
           res.status(400).send(err);
        }
        else
        {
            res.status(200).send("New carpool created!");
        }
    });
})

// db.db("root").collection("uride").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
module.exports = router;