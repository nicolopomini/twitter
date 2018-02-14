const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const TweetSchema = new Schema({
	published: {type: Date, default: Date.now()},
	user: {type: mongoose.Schema.Types.ObjectId,  ref: 'User', required: true},
	text: {type: String, required: true}
});

module.exports = mongoose.model('Tweet', TweetSchema);