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

	request.post(options, function (err, response) {
		if (err) {
			res.status(400).send(err);
		}
		
		const result = JSON.parse(response.body);
		
		if (result.error !== null && result.error !== undefined) {
			res.status(result.error.code).send(result.error.message);
			return;
		}

		const query =
		{
			uid:result.localId,
		}

		db = mongoUtil.get();
		db.db("root").collection("users").find(query).toArray(function (err, result) {
			if (err) {
				res.status(400).send(err);
				throw err;
			}
			res.status(200).send(result);
		});
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

	request.post(options, function (err, response) {
		if (err) {
			res.status(400).send("Registration error: " + err);
			throw err;
		}
		const result = JSON.parse(response.body);
		
		if (result.error !== null && result.error !== undefined) {
			
			res.status(result.error.code).send(result.error.message);
			return;
		}
		const userCredentials =
		{
			uid: result.localId,
			displayName: req.body["name"],
			email: req.body["email"],
		}
		
		db = mongoUtil.get();
		db.db("root").collection("users").insertOne(userCredentials, function (err) {
			if (err) {
				res.status(400).send(err);
			}
			else {
				res.status(200).send(userCredentials);
			}
		});
	});
});

module.exports = router;
