const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//---------ROUTES-------------
const add = require('./routes/add');
const fetch = require('./routes/fetch');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@ds235328.mlab.com:35328/twitter');
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//route handlers
app.use('/add', add);
app.use('/fetch', fetch);

const port = process.env.PORT || 8080;

app.listen(port);
console.log('Working on port ' + port);