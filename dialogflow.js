module.exports = function(app, key) {

	const request = require('request');		
	const TOKEN = key.token;


	const notUnderstood = (res) => {		
		const msg = '죄송해요. 알아듣지못했어요. 다시 말해줄래요?';
		res.json({ 'speech': msg, 'displayText': msg });
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
					
					res.json({ 'speech': msg, 'displayText': msg });
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
					
					res.json({ 'speech': msg, 'displayText': msg });	     					     		
 			}).catch((err) => {
 				notUnderstood(res);
 			});	
 		}
	}

	const analyzeForIntent = (body, res) => {		
		const intentName = body.queryResult.intent.displayName;	

		if(intentName=='view_intent'){	     		
			const discuss_option = body.queryResult.parameters.discuss_option;

     		actionOnViewIntent(discuss_option, res);
		} else {
     	  console.log(`  No intent matched.`);
	      notUnderstood(res);
     	} 			
	}

	const analyzeForIntentV1 = (body, res) => {
		const objResult = body;     	
     	const intentName = objResult.result.metadata.intentName;

     	if(intentName=='view_intent'){	     		
     		const discuss_option = objResult.result.parameters.discuss_option;

     		actionOnViewIntent(discuss_option, res);
     	} else {
     	  console.log(`  No intent matched.`);
	      notUnderstood(res);
     	}
	}

	app.post('/processForDl', (req, res) => {
		const body = req.body;	

		console.log(JSON.stringify(body));

		if(!body){
		  notUnderstood(res);
	  	  return;
	  	}

		analyzeForIntentV1(body, res);
	});

	app.post('/process', (req, res) => {
	  	const query = req.body.query;

	  	if(!query){	  	  
	  	  return;
	  	}	  	

	  	const session_id = 'my_session_id';
	  	const language = 'ko';

	  	const api_url = `https://api.dialogflow.com/v1/query?v=20170712&lang=${language}&sessionId=${session_id}&query=${query}`;

		const options = {
		  url: encodeURI(api_url),  
		  headers: {
		    'Authorization': "Bearer "+TOKEN,
		    'Content-Type': 'application/x-www-form-urlencoded'
		  }
	    };
	    request.get(options, function (error, response, body) {
	      if (!error) {		
	      	body = JSON.parse(body);	        
	        analyzeForIntentV1(body, res);
 
	      } else {
	        console.error("e:"+error);
	        notUnderstood(res);
	      }
	    });
	});



}