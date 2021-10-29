const express = require("express");
const router = express.Router();
const request = require("request");
const path = require("path");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: allows a user to login
 *     operationId: doLogin
 *     description: Adds an item to the system 
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       names: userCredentials
 *       description: Credentials for logging in
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             example: "email@domain.com"
 *           password:
 *             type: string
 *             example: "password"
 */
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
		res.status(201).send(response.body);
	});
});

router.post('/getUser', async(req, res) => 
{
	const credentials = {
		idToken: req.body["idToken"],
	};
	
	const options = {
		url:
			"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
			process.env.FIREBASEKEY,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	};

	request.post(options, function (err, response, body) {
		if (err) {
			res.status(400).send("Error while getting user " + error);
		}
		res.status(201).send(body);
	});
})

module.exports = router;
