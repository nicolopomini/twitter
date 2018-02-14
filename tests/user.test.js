const mongoose = require('mongoose');
const User = require('../models/user');

const validContent1 = {username: 'pincopallino', name: 'Pinco', surname: 'Pallino'};
const validContent2 = {username: 'giuseppeverdi', name: 'Giuseppe', surname: 'Verdi'};

const invalidContent = {name: 'Blabla'};

const u1 = new User(validContent1);	//valid
const u2 = new User(validContent2);	//valid
const u3 = new User(invalidContent);	//invalid

test("Inserting a valid user", () => {
	let error = u1.validateSync();
	expect(error).toBe(undefined);
});
test("Inserting a not valid user: username missing", () => {
	let error = u3.validateSync();
	expect(error).not.toBe(undefined);
});