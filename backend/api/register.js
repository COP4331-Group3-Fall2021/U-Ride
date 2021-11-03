const express = require("express");
const router = express.Router();
const request = require("request");
const path = require("path");

router.get("/register", async (req, res) => {
	const credentials = {
		email: req.body["email"],
		password: req.body["password"],

		returnSecureToken: true,
	};

	const options = {
		url:
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
			process.env.FIREBASEKEY,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	};

	request.post(options, function (err, response, body) {
		if (err) {
			res.status(400).send("Error while registering: " + error);
		}
		console.log("Registration Sucessful", body);
		res.status(201).send(response.body);
	});
});

module.exports = router;