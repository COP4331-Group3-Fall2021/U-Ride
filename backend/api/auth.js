const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/login", async (req, res) => {
	const credentials = {
		email: req.body["email"],
		password: req.body["password"],
		returnSecureToken: true,
	};

	const options = {
		url:
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
			process.env.FIREBASEKEY,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	};

	request.post(options, function (err, response, body) {
		if (err) {
			res.status(400).send("Error while logging in " + error);
		}
		console.log("Login Sucessful", body);
		res.status(201).send(response.body);
	});
});

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
			res.status(400).send("Registration error: " + error);
		}
		console.log("Registration Sucessful", body);
		res.status(201).send(response.body);
	});
});

module.exports = router;
