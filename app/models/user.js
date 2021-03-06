//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user schema
var userSchema = new Schema({
  name: String,
  username:{
    type:String,
    required:true,
    index:{
      unique:true
    }
  },
  password:{
    type:String,
    required:true,
    select:false // te ayuda hacer una peticion pero la contraseña no me la retorna
  }
});

userSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')){
    return next();
  }

  //generate to hash
  bcrypt.hash(user.password, null, null, function(err,hash){
    if(err){
      return next(err);
    }

    //change password
    user.password = hash;
    next();
  });

});

userSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);
