module.exports = function(app, key) {

	const request = require('request');		
	const TOKEN = key.token;


	const notUnderstood = (res) => {		
		const msg = '죄송해요. 알아듣지못했어요. 다시 말해줄래요?';
		res.json({ 'speech': msg, 'displayText': msg });
	}

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
	        const objResult = JSON.parse(body);
	     	// res.json({flag: 1, data: objResult.result.parameters});
	     	const intentName = objResult.result.metadata.intentName;

	     	if(intentName=='view_intent'){	     		
	     		const discuss_option = objResult.result.parameters.discuss_option;

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
	     		
	     	} else {
	     		console.log(`  No intent matched.`);
		      	notUnderstood(res);
	     	}
 
	      } else {
	        console.error("e:"+error);
	        notUnderstood(res);
	      }
	    });
	});


}