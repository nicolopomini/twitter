const fetch = require('node-fetch');

const getAll = function() {
	return fetch('https://twitteruhopper.herokuapp.com/fetch', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
	});
}
const getByUser = function(username) {
	return fetch('https://twitteruhopper.herokuapp.com/fetch/' + username, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
	});
}

test('Retrieving all tweets', () => {
	getAll().then(res => {
		expect(res.status).toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(true);
	})
});
test('Retrieving tweets from a valid username', () => {
	getByUser('pincopallino').then(res => {
		expect(res.status).toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(true);
	})
});
test('Retrieving tweets from a non valid username', () => {
	getByUser('blabla').then(res => {
		expect(res.status).not.toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(false);
	})
});