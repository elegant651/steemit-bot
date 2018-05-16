module.exports = function(app) {

	const steem = require('steem');

	app.getAccounts = (...accounts) => {
		return new Promise((resolve, reject) => {
			steem.api.getAccounts(accounts, (err, response) => {
				if(err) {
					reject(err);
				}

				resolve(response);
			});
		});
	}

	app.getDiscussionsByCreated = (query) => {
		return new Promise((resolve, reject) => {
			steem.api.getDiscussionsByCreated(query, function(err, response) {
			    if(err){
			        reject(err);
			    }
			    
			    resolve(response);
			});
		});
	}

}