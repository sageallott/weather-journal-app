// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize project
app.use(express.static('website'));

// Post Route
const data = [];
app.post('/add', addData);

function addData(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Callback function to complete GET '/all'
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
}

// Setup Server
const port = 8080;
const server = app.listen(port, listening);

function listening() {
  console.log(`Running on localhost: ${port}`);
};