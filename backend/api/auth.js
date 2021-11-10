const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoUtil");



/**
 * Allows a user to log into the application
 */
router.post("/login", async (req, res) => {

	if (req.body["email"] === null || req.body["email"] === undefined)
	{
		res.status(400).send("INVALID_EMAIL");
	}

	if (req.body["password"] === null || req.body["email"] === undefined)
	{
		res.status(400).send("INVALID_PASSWORD");
	}
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
			uid: result.localId,
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

/**
 * Allows a user to create a new account
 */
router.post("/register", async (req, res) => {
	const credentials = {
		email: req.body["email"],
		password: req.body["password"],
		returnSecureToken: true,
	};

	if (req.body["email"] === null || req.body["email"] === undefined)
	{
		res.status(400).send("INVALID_EMAIL");
	}

	if (req.body["password"] === null || req.body["email"] === undefined)
	{
		res.status(400).send("INVALID_PASSWORD");
	}

	if (req.body["name"] === null || req.body["name"] === undefined)
	{
		res.status(400).send("INVALID_PASSWORD");
	}

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

		results = JSON.parse(response.body);
	
		if (results.error !== null && results.error !== undefined)
		{
			res.status(results.error.code).send(results.error.message);
			return;
		}
		const userCredentials =
		{
			uid: results.localId,
			name: req.body["name"],
			email: req.body["email"],
		}

		db = mongoUtil.get();
		db.db("root").collection("users").insertOne(userCredentials, function (err, response) {
			if (err) {
				res.status(400).send(err);
			}
			else {
				res.status(200).send(response.ops[0]);
			}
		});
	});
});

/**
 * Allows a user to reset their password
 */
router.post("/emailReset/:email", async (req, res) => {

	const credentials = {
		requestType: "PASSWORD_RESET",
		email: req.params.email,
	};

	if (req.body["email"] === null || req.body["email"] === undefined)
	{
		res.status(400).send("INVALID_EMAIL");
	}


	const options = {
		url:
			"https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
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
		res.status(200).send("Reset email sent");
	});

})

/**
 * Get User
 */
router.get("/getUser/:_id", async (req, res) => {

	db = mongoUtil.get();
	db.db("root").collection("users").find({ _id: ObjectId(req.params._id) }).toArray(function (err, result) {
		if (err) {
			res.status(400).send(err);
			throw err;
		}
		if (result[0] === undefined || result[0] === null)
		{
			res.status(404).send("User not Found");
		}
		res.status(200).send(result[0]);
	});
});


module.exports = router;
