const express = require("express");
const router = express.Router();
const mongoUtil = require("../mongoUtil");


// Create Carpool 
router.put("/insert", async (req, res) => {

    db = mongoUtil.get();
    db.db("root").collection("uride").insertOne(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send("New carpool created!");
        }
    });
})

// Delete Carpool 
router.delete("/delete", async (req, res) => {
    db = mongoUtil.get();
    db.db("root").collection("uride").deleteOne(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send("Carpool deleted!");
        }
    });
})

router.get("/find", async (req, res) => {
    db = mongoUtil.get();
    db.db("root").collection("uride").find({}).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})

module.exports = router;