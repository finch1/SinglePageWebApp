const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const tasks = require('./routes/tasks'); 
const app = express();


let port = process.env.PORT || 3000 // sets a relative port
// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //specifies the engine we want to use
app.engine('html', require('ejs').renderFile); //renders files with html extension
// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index); //sets our home page route
app.use('/api', tasks); //sets our api call routes

//Starts our server
app.listen(port, function() {
  console.log('We have successfully connected to port: ', port);
});
