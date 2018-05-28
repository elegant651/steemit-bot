module.exports = function(app, key) {

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

	app.getDiscussionsByHot = (query) => {
		return new Promise((resolve, reject) => {
			steem.api.getDiscussionsByHot(query, function(err, response) {
			    if(err){
			        reject(err);
			    }
			    			    
			    resolve(response);
			});
		});
	}


	app.comment = (post, tags) => {
		return new Promise((resolve, reject) => {
			const title = "";
			const body = "안녕하세요. 업보팅 하고 갑니다."
			const metadata = { tags: [tags] };
			steem.broadcast.comment(
				key.postKey,
				post.author,
				post.permlink,
				key.creator,
				steem.formatter.commentPermlink(post.author, post.permlink),
    			title,
    			body,
    			metadata
			);
		});
	}


	app.vote = (post, rate) => {
		return new Promise((resolve, reject) => {
			steem.broadcast.vote(
				key.postKey,
				key.creator,
				post.author,
				post.permlink,
				rate,
				(err, res) => {
					if(err) {
						reject(err);
					} else {
						resolve(res);
					}
				}
			);
		});
	}
	

}