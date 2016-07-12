var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname)+'/index.html');
});


//middleware
adminRouter.use(function(req, res, next){
 console.log(req.method, req.url);
 next();
});

adminRouter.param('name', function(req,res,next,name){
  console.log('req name',req.params.name);
  console.log('name',name);
  req.name = "MR. robot was here!";
  next();
});

//router
adminRouter.get('/', function(req, res){
	res.send('Estoy en la pagina princial');
})

adminRouter.get('/users', function(req, res){
	console.log('users view');
	res.send('Aqui se mostraran los usuarios');
})

adminRouter.get('/users/:name', function(req, res){
	console.log('users name');
	res.send('Hola '+req.name);
})


adminRouter.get('/posts', function(req, res){
	res.send('Aqui se mostraran los articulos');
})

app.use('/admin', adminRouter);

app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'));
console.log('Here we are go');
