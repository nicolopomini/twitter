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

router.get('/:word', (req, res) => {
	Tweet.find({
		text: {$regex: req.params.word, $options: "i"}
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
});

module.exports = router;