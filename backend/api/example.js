const express = require('express');
const router = express.Router();


router.get('/ping', async (rec, res, next) => {
    console.log(`Received ping: ${rec}`);

    res.status(200).json({date: new Date()});
});

module.exports = router;