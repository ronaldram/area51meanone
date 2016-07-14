var express = require('express');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://admin:admin@ds019472.mlab.com:19472/pokemon_ram')
console.log(mongoose);
var app = express();
var path = require('path');
var adminRouter = express.Router();
var loginRouter = express.Router();
var errorRouter = express.Router();

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

loginRouter.use(function(req, res, next){
 console.log('loginRouter.use', req.method, req.url);
 console.log('loginRouter.login', req.userlogin, req.password);
 next();
});

loginRouter.param('userlogin', function(req, res,next,userlogin){
	console.log('-------userlogin----------')
	console.log('req userlogin', req.params.userlogin);
	console.log('userlogin', userlogin);

	if(userlogin=='pepito'){
		req.userlogin=userlogin;
	}else{
		console.log('user invalid!');
	}
	console.log('--------userlogin---------')
	next();

});

loginRouter.param('password', function(req, res, next, password){
	console.log('-------password----------')
	if(password=="lima123"){
		req.password=password;
		next();
	}else{
		console.log('password invalid!');
		res.redirect('/error');
	}
	console.log('-------userlogin----------')

});

//router - users
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

//router login

loginRouter.get('/', function(req,res){
	res.send('Estoy en el login');
});


loginRouter.get('/authenticar/:userlogin/:password', function(req,res){
	console.log('userlogin view', req.userlogin);
	console.log('password view', req.password);

	if(req.userlogin && req.password)
		res.send('Bienvenido Don '+req.userlogin);
	else
		res.send('Usuario Invalido, intentelo nuevamente!');
});

errorRouter.get('/', function(req, res){
	res.send('User invalido');
});

app.use('/userlogins', loginRouter);
app.use('/admin', adminRouter);
app.use('/error', errorRouter);

app.route('/account')
.get(function(req,res){
	console.log('account get');
	res.send('acount get');
})
.post(function(req,res){
	console.log('account post');
	res.send('acount post');
})
.put(function(req,res){
	console.log('account put');
	res.send('acount put');
})
.delete(function(req,res){
	console.log('account delete');
	res.send('acount delete');
});


app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'));
console.log('Here we are go');
