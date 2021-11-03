const express = require("express");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoUtil");


router.put("/insert", async (req, res) => {
    
    db = mongoUtil.get();

    db.db("admin").collection("uride").insertOne(req.body, function (err) {
        if (err) 
        {
            throw err;
        }
    });
})

module.exports = router;