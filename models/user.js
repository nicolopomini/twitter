const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {type: String, required: true, unique: true, dropDups: true},	//unique username, drops duplicated
	name: String,
	surname: String
});

module.exports = mongoose.model('User', UserSchema);