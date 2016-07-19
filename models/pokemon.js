//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pockemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    index:{
      unique:true
    }
  },
  type: String,
  Query: {
    type:Number,
    default:0
  }
});

pockemonSchema.methods.sayHi = function(){
  var pokemon = this;
  return 'Hola soy un '+pokemon.name +'de tipo '+pokemon.type+' visto ' + pokemon.Query;
};

//pockemonSchema.pre('findById', function(next){
  //var pokemon = this;
  //pokemon.Query=pokemon.Query+1;
  //return next();
//});

module.exports = mongoose.model('Pokemon', pockemonSchema);
