const steem = require('steem');
// steem.api.getAccounts(['ned', 'dan'], (err, response) => {
// 	console.log(err, response);
// });

const query = {"tag": "kr", "limit": 10};
steem.api.getDiscussionsByCreated(query, function(err, result) {
    if(err){
        console.log("err:" + err)        
    }
    else{        
        console.log(result)
    }
});