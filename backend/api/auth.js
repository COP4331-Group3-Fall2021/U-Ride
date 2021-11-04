const express = require("express");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoUtil");


router.post("/login", async (req, res) => {
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

router.post("/register", async (req, res) => {
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
			res.status(400).send("Registration error: " + err);
			throw err;
		}
		if (response.body["error"] !== null && response.body["error"] !== undefined) {
			const result = JSON.parse(response.body);
			console.log(result.error.code);
			res.status(result.error.code).send("Error" + result.error.message);
		}

		const nameCredentials =
		{
			idToken: response["idToken"],
			displayName: req.body["name"],
			returnSecureToken: true,
		}
		
		db = mongoUtil.get();
		db.db("root").collection("users").insertOne(nameCredentials, function (err) {
			if (err) {
				res.status(400).send("DB" + err);
			}
			else {
				res.status(200).send("Registration successful!");
			}
		});

	});
});

module.exports = router;
