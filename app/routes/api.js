var bodyParser= require('body-parser');
var jwt       = require('jsonwebtoken');
var User      = require('../models/user');
var Pokemon   = require('../models/pokemon');
var config    = require('../../config')

var superSecret = config.superSecret;

module.exports = function(app, express){

  var apiRouter = express.Router();

  apiRouter.post('/authenticate', function(req, res){
    User.findOne({
      username:req.body.username
    })
    .select('name username password')
    .exec(function(err, user){
      if(err) throw err;
      //username was not found.
      if(!user){
        return res.json(
          {
            success:false,
            message:'Autenticacion ha fallado. Usuario no existe.'
          }
        );
      }else if(user){
        //validate if password matches.
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          return res.json(
            {
              success:false,
              message:'Autenticacion ha fallado. Contraseña incorrecta.'
            }
          );
        }
        //Generar tokens
        ////payload, signature(secretOrprivatyKey), options(header), callback
        var token = jwt.sign(
          {
            name:user.name,
            username:user.username,
          },
          superSecret,
          {
            //expiresIn:'24h'
            expiresIn:'1m'
          }
        );
        return res.json(
          {
            success:true,
            token:token,
            message:'Usuario es valido.'
          }
        );
      }
    });
  });

  //middleware to verify a token
  /*apiRouter.use(function(req, res, next){
    console.log('Alguien ha encontrado a nuestra matrix.')
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('token', token);
    if(token){
      jwt.verify(token, superSecret, function(err, decoded){
        if(err){
          return res.json({
            success:false,
            message:'Fallo de autenticacion del token.'
          });
        }else{
          req.decoded = decoded;
          console.log('decodificado:',decoded);
          next();
        }
      });
      //verity token
    }else{
      return res.status(403).send({
        success:false,
        message:'No se envio el token.'
      });
    }

  });*/

  apiRouter.get('/',function(req, res){
    res.json({
      message : "welcome to the matrix"
    });
  });

  apiRouter.get('/me',function(req, res){
    console.log('entro me');
    return res.json({
      username : req.decoded.username
    });
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
      if(err){
        if(err.code==11000){//mongo retorn this code
          return res.json({sucess:false, message:'El nombre es duplicado'});
        }
          return res.json({sucess:false, message:'Error desconocido'});
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
        if(user)
          res.json({message:'Usuario no existe'});
        else {
          res.json({message:'Usuario eliminado correctamente'});
        }
      }
    );
  });

  apiRouter.route('/users/user_name/:user_name')
  .get(function(req,res){
    User.findOne({username:req.params.user_name}, function(err, user){
      if(err) return res.send(err);
      res.json(user);
    });
  })

  //Routers /users/user_id
  apiRouter.route('/pokemons/:pokemon_id')
  .get(function(req,res){
    Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
      if(err) return res.send(err);
      pokemon.Query=pokemon.Query+1;

      pokemon.save(function(err){
        if(err) return res.send(err);
        res.json(pokemon.sayHi());
      });
    });
  })
  .put(function(req,res){
    Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
      if(err) return res.send(err);
      if(req.body.name) pokemon.name = req.body.name;
      if(req.body.type) pokemon.type = req.body.type;
      if(req.body.owner) pokemon.owner = req.body.owner;
      console.log(pokemon.owner, req.body.owner)

      pokemon.save(function(err){
        if(err) return res.send(err);
        res.json({message:'Pokemon Actualizado'});
      });
    });
  })
  .delete(function(req,res){
    Pokemon.remove(
      {_id:req.params.pokemon_id},
      function(err, pokemon){
        if(err) return res.send(err);
        if(pokemon)
          res.json({message:'Pokemon no existe'});
        else {
          res.json({message:'Pokemon eliminado correctamente'});
        }
      }
    );
  });


  //Routers /pokemons
  apiRouter.route('/pokemons')
  //Create a pokemon through post
  //URL:  http://localhost:5000/api/pokemon
  .post(function(req,res){
    var pokemon = new Pokemon();
    pokemon.name = req.body.name;
    pokemon.type = req.body.type;
    pokemon.owner = req.body.owner;
    pokemon.save(function(err){
    //verify duplicate entry on username
    console.log(err);
    if(err)
      if(err.code==11000){//mongo retorn this code
        return res.json({sucess:false, message:'El nombre es duplicado de pokemon'});
      }

      res.json({success:true, message:''});
    });
  })
  .get(function(req, res){
  /*	Pokemon.find(function(err, pokemons){
  		if(err) return res.send(err);
  		res.json(pokemons);
   });
   */
   Pokemon.find({}, function(err, pokemons){
       User.populate(pokemons, {path:'owner',
       select:{name:1, username:1},
       match:{name:'popo'}//,
       //options:{limit:2}
        },

       function(err, pokemons){
         res.status(200).json(pokemons);
       });
   })
   //.skip(2).limit(4);//.skip(2).limit(4);
   //.sort({Query:-1}); // query = 1 = asc; query = -1 = desc // case sensitive
   .select({name:1, type:1, owner:1});//.select('name type');//.select('-name -type');//no aparecen
   //select({type:0}); todas las columans menos type;

  }
  );

  apiRouter.route('/pokemons/type/:type/:name')
  .get(function(req, res){


     Pokemon.find({
       //type:req.params.type
       //type: { $regex : new RegExp(req.params.type, "i")},
       //$or:[
         //{name: { $regex : new RegExp(req.params.name, "i")}},
         //{type: { $regex : new RegExp(req.params.type, "i")}}
       //],
       //COUNTS
       //Query:{$gt:0, $lt:20}

       //in(1,2,3) like sql
       name:{
         $in:['squirtle','pigeot']
       }
     }, function(err, pokemons){
       res.json(pokemons);
     });
  })
  .post(function(){

  })

  return apiRouter;
}
