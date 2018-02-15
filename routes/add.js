const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();

//-------MODELS-------------
const User = require('../models/user');
const Tweet = require('../models/tweet');
//------ERROR FUNCTIONS---------
const errors = require('./errors');
const badRequest = errors.badRequest;
const internalError = errors.internalError;

router.post('/', (req, res) => {
	if(!req.body.user || !req.body.text) {	//check request values	
		badRequest(res, 'Error, missing parameter(s)');
		return;
	}
	User.findById(req.body.user, (err, user) => {	//search for user
		if(err)
			internalError(res, 'Error with database');
		else if(user) {		//valid user, create new tweet
			let tweet = new Tweet(req.body);
			let error = tweet.validateSync();
			if(error)
				internalError(res, 'Error creating the new tweet');
			else
				tweet.save(err => {		//saving tweet
					if(err)
						internalError(res, 'Error saving the new tweet');
					Tweet.findById(tweet._id).		//preparing response
					populate('user').
					exec((err, t) => {
						if(err)
							internalError(res, 'Error retrieving information');
						let ris = {ok: true, result: t};
						res.statusCode = 200;
  						res.setHeader("Content-Type", "application/json");
  						res.json(ris);
					});

				});
		} else			//given user doesn't exist
			badRequest(res, 'User not valid');
	});
});

module.exports = router;