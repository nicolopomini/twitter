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

router.get('/', (req,res) => {	//get all tweets
	Tweet.find()
	.populate('user')
	.sort('published')
	.exec((err, tweets) => {
		if(err)
			internalError(res, 'Error retrieving new tweet');
		let ris = {ok: true, result: tweets};
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.json(ris);
	});
});

router.get('/:username', (req,res) => {		//get tweets by user
	User.findOne({
		username: req.params.username
	})
	.exec((err, user) => {
		if(err)
			internalError(res, 'Error with database');
		else if(user) {		//user found
			Tweet.find({
				user: user._id
			})
			.populate('user')
			.sort('published')
			.exec((err, tweets) => {
				if(err)
					internalError(res, 'Error retrieving new tweet');
				let ris = {ok: true, result: tweets};
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(ris);
			});
		} else
			badRequest(res, 'User not valid');
	});
});	

module.exports = router;