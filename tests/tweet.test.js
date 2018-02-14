const mongoose = require('mongoose');
const User = require('../models/user');
const Tweet = require('../models/tweet');

const validUser = {username: 'pincopallino', name: 'Pinco', surname: 'Pallino'};
const user = new User(validUser);

const validTweet = {text: 'lorem ipsum dixit ipse', user: user};
const t1 = new Tweet(validTweet);
const t2 = new Tweet(user);
const t3 = new Tweet({text: 'lorem ipsum dixit ipse'});

test("Inserting a valid tweet", () => {
	let error = t1.validateSync();
	expect(error).toBe(undefined);
});
test("Inserting a not valid tweet: text is missing", () => {
	let error = t2.validateSync();
	expect(error).not.toBe(undefined);
});
test("Inserting a not valid tweet: user is missing", () => {
	let error = t3.validateSync();
	expect(error).not.toBe(undefined);
});