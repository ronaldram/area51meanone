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
  type: String
});

module.exports = mongoose.model('Pokemon', pockemonSchema);
