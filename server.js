var express = require('express');

var app = express();
var path = require('path');
//var adminRouter =   express.Router();
//var loginRouter = express.Router();
//var errorRouter = express.Router();

var bodyParser=require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
//console.log(mongoose);

var port = process.env.PORT || 5001;

//APP CONFIGURATION
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type, Authorization');
  next();
});

app.use(morgan('dev'));
//db connection
mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://admin:admin@ds019472.mlab.com:19472/pokemon_ram')

//API ROUTERS

//main basic route
app.get('/', function(req, res){
  res.send('welcome to the real world')
});

//express router instance
var apiRouter = express.Router();

//Accessed at GET http://localhost:5000/api
apiRouter.get('/', function(res,res){
  res.json({message:'Stop to try hit me and hit me!'})
});

//Routers /users
apiRouter.route('/users')
//Create a user through post
//URL:  http://localhost:5000/api/users
.post(function(req,res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err){
    //verify duplicate entry on username
    console.log(err);
    if(err)
    if(err.code==11000){//mongo retorn this code
      return res.json({sucess:false, message:'El nombre es duplicado'});
    }

    res.json({success:true, message:''});
  });
})
.get(function(req, res){
	User.find(function(err, users){
		if(err) return res.send(err);
		res.json(users);
 });
}
);

//Routers /users/user_id
apiRouter.route('/users/:user_id')
.get(function(req,res){
  User.findById(req.params.user_id, function(err, user){
    if(err) return res.send(err);
    res.json(user);
  });
})
.put(function(req,res){
  User.findById(req.params.user_id, function(err, user){
    if(err) return res.send(err);
    if(req.body.name)user.name = req.body.name;
    if(req.body.username)user.username = req.body.username;
    if(req.body.password)user.password = req.body.password;
    user.save(function(err){
      if(err) return res.send(err);
      res.json({message:'Usuario Actualizado'});
    });
  });
})
.delete(function(req,res){
  User.remove(
    {_id:req.params.user_id},
    function(err, user){
      if(err) return res.send(err);
      res.json({message:'Usuario eliminado correctamente'});
    }
  );
});



//Register our router
app.use('/api', apiRouter);
app.listen(port);
console.log('Here we are go');
