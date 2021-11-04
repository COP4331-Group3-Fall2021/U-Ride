const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const mongoUtil = require("../mongoUtil");


// Create Carpool 
router.post("/insert", async (req, res) => {

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

// Search Carpool
router.get("/find", async (req, res) => {
    db = mongoUtil.get();
    db.db("root").collection("uride").find(req.body).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})

router.get("/findbyId", async (req, res) => {
    db = mongoUtil.get();
    db.db("root").collection("uride").find({_id: ObjectId(req.body["_id"])}).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})
// Update Carpool
router.put("/update", async (req, res) => {
    db = mongoUtil.get();

    db.db("root").collection("uride").updateOne(req.body["query"],req.body["update"], function (err) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send("Carpool updated!");
    });
})

module.exports = router;