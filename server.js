var express   = require('express');
var app       = express();
var bodyParser= require('body-parser');
var morgan    = require('morgan');
var mongoose  = require('mongoose');
var config    = require('./config')
var path      = require('path');

//App Configuration
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type, Authorization');
  next();
});

//logs
app.use(morgan('dev'));

//db connection
mongoose.connect(config.database);

//set static files location for front end (Angular files)
app.use(express.static(__dirname + '/public'));

//register our router
var apiRouter = require('./app/routes/api.js')(app, express);

app.use('/api', apiRouter);

//main catchall route
//send user to front end
app.get('*', function(req,res){
   res.sendFile(path.join(__dirname + '/public/views/index.html' ))
});

//set up port
app.listen(config.port);
console.log('Neo come over port' + config.port);
