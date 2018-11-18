module.exports = function(app, key) {

	const request = require('request');

	const notUnderstood = (res) => {		
		const msg = '죄송해요. 알아듣지 못했어요. 다시 말해줄래요?';		
		res.json({
        	"version": "2.0",
        	"resultCode": "OK",
        	"output": {
          		"content": msg
          	}
        })
	}

	const actionOnViewIntent = (discuss_option, res) => {
		const st_query = {"tag": "kr", "limit": 10};
 		if(discuss_option=='최신'){
 			app.getDiscussionsByCreated(st_query).then((result) => {
					let msg = "";
					result.forEach((entry) => {
						const url = "https://steemit.com/"+entry.url;
						msg += entry.title +"\n URL: "+url;
					});
					
					res.json({
			        	"version": "2.0",
			        	"resultCode": "OK",
			        	"output": {
			          		"content": msg
			          	}
			        })
 			}).catch((err) => {
 				notUnderstood(res);
 			});
 		} else if(discuss_option=='핫한'){	     			
 			app.getDiscussionsByHot(st_query).then((result) => {	     				
				let msg = "";
				result.forEach((entry) => {
					const url = "https://steemit.com/"+entry.url;
					msg += entry.title +"\n URL: "+url;
				});
				
				res.json({
		        	"version": "2.0",
		        	"resultCode": "OK",
		        	"output": {
		          		"content": msg
		          	}
		        })
 			}).catch((err) => {
 				notUnderstood(res);
 			});	
 		}
	}

	const actionOnVoteIntent = (tag, res) => {		
		app.getDiscussionsByTag(tag).then((post) => {
			console.log(JSON.stringify(post));

			app.vote(post, 100).then((post) => {
				app.comment(tag, post).then((post) => {		
				
					let msg = `${tag}의 자동 보팅이 완료되었습니다! `;
					const url = "https://steemit.com/"+post.url;
					msg += post.title +"\n URL: "+url;							

					res.json({
			        	"version": "2.0",
			        	"resultCode": "OK",
			        	"output": {
			          		"content": msg
			          	}
			        })
				}).catch((err) => {
					console.error(err);
					const errorMsg = `다음과 같은 이유로, 프로세스가 완료되지 못했습니다 : ${err}`;
					res.json({
			        	"version": "2.0",
			        	"resultCode": "OK",
			        	"output": {
			          		"content": errorMsg
			          	}
			        })
				});
			}).catch((err) => {
				console.error(err);
				const errorMsg = `다음과 같은 이유로, 프로세스가 완료되지 못했습니다 : ${err}`;
				res.json({
		        	"version": "2.0",
		        	"resultCode": "OK",
		        	"output": {
		          		"content": errorMsg
		          	}
		        })
			});
		}).catch((err) => {
			console.error(err);
			notUnderstood(res);
		});						
	}

	app.post('/answer.view_intent', (req, res) => {
		const body = req.body;	

		console.log(JSON.stringify(body));

		if(!body){
		  notUnderstood(res);
	  	  return;
	  	}

	  	let option = "최신"
	  	if(body.action.parameters.hasOwnProperty("ds_option_hot")) {
	  		option = "핫한"
	  	}

		actionOnViewIntent(option, res);
	})

	app.post('/answer.vote_intent', (req, res) => {
		const body = req.body;

		console.log(JSON.stringify(body));

		if(!body){
		  notUnderstood(res);
	  	  return;
	  	}

	  	if(body.action.parameters.hasOwnProperty("tag")){
	  		let tag = body.action.parameters.tag.value
		  	
			actionOnVoteIntent(tag, res);		
	  	} else {
	  		const errorMsg = `일치하는 태그가 없습니다`;
			res.json({
	        	"version": "2.0",
	        	"resultCode": "OK",
	        	"output": {
	          		"content": errorMsg
	          	}
	        })
	  	}
	  	
	})
}