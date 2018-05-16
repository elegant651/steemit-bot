module.exports = function(app) {

	const request = require('request');		
	const TOKEN = '';

	app.post('/process', (req, res) => {
	  	const query = req.body.query;

	  	if(!query){
	  	  res.json({flag: 0});
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

	     	if(intentName=='wallet_info'){
	     		app.getWalletinfo().then((data) => {
	     			res.json({flag: 1, data: data})
	     		}).catch((err) =>{
		      		console.error(err);
		      		res.json({flag: 0});
		      	});		      	
	     	} else {
	     		console.log(`  No intent matched.`);
		      	res.json({flag: 0});
	     	}
 
	      } else {
	        console.error("e:"+error);
	      }
	    });
	});


}