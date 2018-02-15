const fetch = require('node-fetch');
const goodRequest = {user: '5a84a5ef947f1b0b2ce45076', text: 'lorem ipsum'};
const bad1 = {user: '5a84a5ef911f1b0b2ce45076', text: 'blabla'};
const bad2 = {user: 'aaaa', text: 'blabla'};
const bad3 = {text: 'sdfwrf'};

const add = function(body) {
	return fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

test('Testing correct way to insert a new tweet', () => {
	add(goodRequest)
	.then(res => {
		expect(res.status).toBe(200);
		return res.json();
	})
	.then(r => {
		expect(r.ok).toBe(true);
	})
});
test('Invalid user', () => {
	add(bad1).then(res => {expect(res.status).not.toBe(200);})
});
test('Passed a generic string instead of a user id', () => {
	add(bad2).then(res => {expect(res.status).not.toBe(200);})
});
test('Missing parameters', () => {
	add(bad3).then(res => {expect(res.status).not.toBe(200);})
});