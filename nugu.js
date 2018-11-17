module.exports = function(app, key) {

	const request = require('request');

	app.post('/answer.view_intent', (req, res) => {
		const body = req.body;	

		console.log(JSON.stringify(body));

	})

	app.post('/answer.vote_intent', (req, res) => {
		const body = req.body;

		console.log(JSON.stringify(body));
	})
}