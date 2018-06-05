const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

app.use((err, req, res, next) => next());

const key = JSON.parse(fs.readFileSync('./.key', 'utf8'));

require('./steemapi')(app, key);
require('./dialogflow')(app, key);

// const tag = "kr-dev";
// app.getDiscussionsByTag(tag).then((post) => {
// 	console.log(JSON.stringify(post));
// 	app.comment(tag, post).then((post) => {		
// 		app.vote(post, 10).then((post) => {
// 			let msg = `${tag}의 자동 보팅이 완료되었습니다! `;
// 			const url = "https://steemit.com/"+post.url;
// 			msg += post.title +"\n URL: "+url;							

// 			res.json({ 'speech': msg, 'displayText': msg });			
// 		}).catch((err) => {
// 			console.error(err);
// 		});
// 	}).catch((err) => {
// 		console.error(err);
// 	});
// }).catch((err) => {
// 	console.error(err);
// });				

const server = app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});