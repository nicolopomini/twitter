const fetch = require('node-fetch');

const search = function(word) {
	return fetch('https://twitteruhopper.herokuapp.com/search/' + word, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
	});
}

test('Search with a word (sub)contained in almost one tweet', () => {
	search('uov').then(res => {
		expect(res.status).toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(true);
	});
});
test('Search with a word not contained in any tweet', () => {
	search('aa').then(res => {
		expect(res.status).toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(true);
	});
});
test('Trying to leave the parameter empty', () => {
	search('').then(res => {
		expect(res.status).not.toBe(200);
	});
});