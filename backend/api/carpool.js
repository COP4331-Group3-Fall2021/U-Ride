const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const mongoUtil = require("../mongoUtil");

// Create Carpool 
router.post("/create", async (req, res) => {
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
router.delete("/delete/:_id", async (req, res) => {
    db = mongoUtil.get();

    if (req.params._id === null || req.params._id === undefined) {
        res.status(400).send("Missing user id");
        return;
    }

    db.db("root").collection("uride").deleteOne({ _id: ObjectId(req.params._id) }, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send("Carpool deleted!");
        }
    });
})

// Search Carpool (Searches with any given query)
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

// Returns details about a carpool by using it's _id
router.get("/findCarpool/:_id", async (req, res) => {
    db = mongoUtil.get();

    if (req.params._id === null || req.params._id === undefined) {
        res.status(400).send("Missing user id");
        return;
    }

    db.db("root").collection("uride").findOne({ _id: ObjectId(req.params._id) }).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})

// Returns all rides a user is in by using a user's _id
router.get("/findRides/:_id", async (req, res) => {
    db = mongoUtil.get();

    if (req.params._id === null || req.params._id === undefined) {
        res.status(400).send("Missing user id");
        return;
    }

    db.db("root").collection("uride").find({ riders: req.params._id }).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})

// Returns all rides a user is in by using a user's _id
router.get("/findDrives/:_id", async (req, res) => {
    db = mongoUtil.get();

    if (req.params._id === null || req.params._id === undefined) {
        res.status(400).send("Missing user id");
        return;
    }

    db.db("root").collection("uride").find({ "driver._id": req.params._id }).toArray(function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }
        res.status(200).send(result);
    });
})

router.get("/closest?", async (req, res) => {
    db = mongoUtil.get();

    // console.log(db.db("root").collection("uride"));
    // console.log(req.query);
    db.db("root").collection("uride").createIndex(
        { origin: "2dsphere" },
        { origin: "2d" },
        { destination: "2dsphere" })

    db.db("root").collection("uride").createIndex({ "geometry.coordinates": "2dsphere" });

    if (req.query.isStart === "true") {
        db.db("root").collection("uride").findMany({
            origin: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-81.2000599, 28.6024274]
                    },
                }
            }
        }).toArray(function (err, result) {
            if (err) {
                res.status(400).send(err);
                throw err;
            }
            console.log(result);
            res.status(200).send(result);
        });
    }
    else {
        db.db("root").collection("uride").find({
            isFull: false,
            "detination.coordinates": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
                    },
                    $minDistance: 0,
                    $maxDistance: 1000,
                }
            }
        }).toArray(function (err, result) {
            if (err) {
                res.status(400).send(err);
                throw err;
            }
            res.status(200).send(result);
        });
    }

})
// Allows a user to join a carpool
router.put("/join/:carpool/:user", async (req, res) => {
    db = mongoUtil.get();

    // Finding current values for carpool (stored in result)
    db.db("root").collection("uride").find({ _id: ObjectId(req.params.carpool) }, function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }

        // Updating the carpool 
        db.db("root").collection("uride").updateOne({
            _id: ObjectId(req.params.carpool),
            isFull: false,
        },
            {
                // numParticipants += 1
                $inc: {
                    numParticipants: 1
                },

                // if numPartcipants == maxParticipants sets isFull to true, otherwise isFull is false
                $set: {
                    isFull: result.numParticipants + 1 === result.maxParticipants
                },

                // adds the user as a rider 
                $push: {
                    riders: req.params.user
                }
            }
            , function (err, result) {
                if (err) {
                    res.status(400).send(err);
                    throw err;
                }

                // ModifiedCount === 0, if the carpool cannot be found or carpool is already full
                if (result.modifiedCount === 0) {
                    res.status(400).send("Cannot join carpool at this time.");
                    return;
                }
                res.status(200).send("Carpool Joined!");
            })
    })
})

// Allows a user to join a carpool
router.put("/leave/:carpool/:user", async (req, res) => {
    db = mongoUtil.get();

    // Finding current values for carpool (stored in result)
    db.db("root").collection("uride").findOne({ _id: ObjectId(req.params.carpool) }, function (err, result) {
        if (err) {
            res.status(400).send(err);
            throw err;
        }

        // Updating the carpool 
        db.db("root").collection("uride").updateOne({
            _id: ObjectId(req.params.carpool),
        },
            {
                // numParticipants += 1
                $inc: {
                    numParticipants: -1
                },

                // if numPartcipants == maxParticipants sets isFull to true, otherwise isFull is false
                $set: {
                    isFull: result.numParticipants - 1 === result.maxParticipants
                },

                // adds the user as a rider 
                $pull: {
                    riders: req.params.user
                }
            }
            , function (err, result) {
                if (err) {
                    res.status(400).send(err);
                    throw err;
                }

                // ModifiedCount === 0, if the carpool cannot be found or carpool is already full
                if (result.modifiedCount === 0) {
                    res.status(400).send("Cannot join carpool at this time.");
                    return;
                }
                res.status(200).send("Carpool Joined!");
            })
    })
})
module.exports = router;