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
require('./nugu')(app, key);

const server = app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});