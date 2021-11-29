const express = require ('express');
const {ObjectId} = require ('mongodb');
const router = express.Router ();
const request = require ('request');
const mongoUtil = require ('../mongoUtil');

var admin = require ('firebase-admin');

var serviceAccount = {
  type: 'service_account',
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g,'\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_URL,
  client_x509_cert_url: process.env.CERT_URL,
};

admin.initializeApp ({
  credential: admin.credential.cert (serviceAccount),
});

async function checkEmailVerification (token, res, successResults) {
  try {
    const user = await admin.auth ().getUser (successResults.uid);
    if (!user.emailVerified) {
      sendEmailVerification (token, res, null, false);
    } else {
      res.status(200).send (successResults);
    }
  } catch (e) {
    res.status (400).send(e);
  }
}
function sendEmailVerification (token, res, successResults, isLogin) {
  const emailVerify = {
    requestType: 'VERIFY_EMAIL',
    idToken: token,
  };

  const options = {
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' +
      process.env.FIREBASEKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (emailVerify),
  };

  request.post (options, function (err, response) {
    if (err) {
      res.status (400).send (err);
      throw err;
    }
    const result = JSON.parse (response.body);

    if (result.error !== null && result.error !== undefined) {
      res.status (result.error.code).send (result.error.message);
      return;
    }
    if (isLogin) {
      res.status (200).send (successResults);
    } else {
      res.status (200).send ('Verification Email Resent');
    }
  });
}
/**
 * Allows a user to log into the application
 */
router.post ('/login', async (req, res) => {
  if (req.body['email'] === null || req.body['email'] === undefined) {
    res.status (400).send ('INVALID_EMAIL');
  }

  if (req.body['password'] === null || req.body['password'] === undefined) {
    res.status (400).send ('INVALID_PASSWORD');
  }
  const credentials = {
    email: req.body['email'],
    password: req.body['password'],
    returnSecureToken: true,
  };

  const options = {
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      process.env.FIREBASEKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (credentials),
  };

  request.post (options, function (err, response) {
    if (err) {
      res.status (400).send (err);
    }

    const results = JSON.parse (response.body);

    if (results.error !== null && results.error !== undefined) {
      res.status (results.error.code).send (results.error.message);
      return;
    }

    var token = results.refreshToken;
    var id_token = results.idToken;
    const query = {
      uid: results.localId,
    };

    db = mongoUtil.get ();
    db.db ('root').collection ('users').findOne (query, function (err, result) {
      if (err) {
        res.status (400).send (err);
        throw err;
      }
      result.refreshToken = token;
      result.idToken = id_token;
      checkEmailVerification (result.idToken, res, result);
    });
  });
});

/**
 * Allows a user to create a new account
 */
router.post ('/register', async (req, res) => {
  const credentials = {
    email: req.body['email'],
    password: req.body['password'],
    returnSecureToken: true,
  };

  if (req.body['email'] === null || req.body['email'] === undefined) {
    res.status (400).send ('INVALID_EMAIL');
  }

  if (req.body['password'] === null || req.body['password'] === undefined) {
    res.status (400).send ('INVALID_PASSWORD');
  }


  const options = {
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      process.env.FIREBASEKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (credentials),
  };

  request.post (options, function (err, response) {
    if (err) {
      res.status (400).send ('Registration error: ' + err);
      throw err;
    }

    results = JSON.parse (response.body);

    if (results.error !== null && results.error !== undefined) {
      res.status (results.error.code).send (results.error.message);
      return;
    }

    const userCredentials = {
      uid: results.localId,
      name: req.body['name'],
      email: req.body['email'],
    };

    db = mongoUtil.get ();
    db
      .db ('root')
      .collection ('users')
      .insertOne (userCredentials, function (err, response) {
        if (err) {
          res.status (400).send (err);
        } else {
          response.ops[0].refreshToken = results.refreshToken;
          response.ops[0].idToken = results.idToken;
          sendEmailVerification (results.idToken, res, response.ops[0], true);
        }
      });
  });
});

/**
 * Allows a user to reset their password
 */
router.post ('/emailReset/:email', async (req, res) => {
  const credentials = {
    requestType: 'PASSWORD_RESET',
    email: req.params.email,
  };

  if (req.params.email === null || req.params.email === undefined) {
    res.status (400).send ('INVALID_EMAIL');
  }

  const options = {
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' +
      process.env.FIREBASEKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (credentials),
  };

  request.post (options, function (err, response) {
    if (err) {
      res.status (400).send (err);
    }
    res.status (200).send ('Reset email sent');
  });
});

/**
 * Get User
 */
router.get ('/getUser', async (req, res) => {
  db = mongoUtil.get ();
  db
    .db ('root')
    .collection ('users')
    .find ({_id: ObjectId (req.body._id)})
    .toArray (function (err, result) {
      if (err) {
        res.status (400).send (err);
        throw err;
      }
      if (result[0] === undefined || result[0] === null) {
        res.status (404).send ('User not Found');
      }
      res.status (200).send (result[0]);
    });
});

// Allows a token to be refreshed
router.post ('/refresh/:oldToken', async (req, res) => {
  if (req.params.oldToken === null || req.params.oldToken === undefined) {
    res.status (400).send ('invalid token');
  }

  const credentials = {
    grant_type: 'refresh_token',
    refresh_token: req.params.oldToken,
  };

  const options = {
    url: 'https://securetoken.googleapis.com/v1/token?key=' +
      process.env.FIREBASEKEY,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (credentials),
  };

  request.post (options, function (err, response) {
    if (err) {
      res.status (400).send (err);
    }
    res.status (200).send (response.body.refreshToken);
  });
});

module.exports = router;
