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

	app.getDiscussionsByTag = (tag) => {
		return new Promise((resolve, reject) => {
			const query = { tag, limit: 1};
			steem.api.getDiscussionsByCreated(query, (err, res) => {
			  if (err) {
			    reject(err);
			  } else {
			    res.forEach(post => {
			      const voters = post.active_votes.map(vote => vote.voter);
			      const isVoted = voters.includes(key.creator);
			      
			      if (!isVoted) {
			      	resolve(post);			        
			      } 
			    });

			    reject("notFound");
			  }
			});
		});
	}

	app.getContentReplies = (author, permlink) => {
		return new Promise((resolve, reject) => {
			steem.api.getContentAsync(author, permlink)
  			.then((post) =>{
    			steem.api.getContentRepliesAsync(post.author, post.permlink)
      			.then((replies) => {
        			// console.log(JSON.stringify(replies, null, 2));
        			resolve(replies);
      			}).catch((err) => {
      				reject(err);
      			});
  			}).catch((err) => {
  				reject(err);
  			});
		});
	}


	app.comment = (tag, post) => {
		return new Promise((resolve, reject) => {			
			const title = "";
			const body = `안녕하세요. \`${tag}\` 태그에 대한 업보팅 하고 갑니다.`;			
			const metadata = { tags: [tag] }
			steem.broadcast.comment(
			    key.postKey,
			    post.author,
			    post.permlink,
			    key.creator,
			    steem.formatter.commentPermlink(post.author, post.permlink),
			    title,
			    body,
			    metadata,
			    (err, result) => {
			      console.log(err, result);
			      if(err) {
			      	reject(err);
			      } else {
			      	resolve(post);
			      }
			    }
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
						resolve(post);
					}
				}
			);
		});
	}
		

}