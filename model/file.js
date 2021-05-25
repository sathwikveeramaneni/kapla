const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phonenumber: {
    type:String,
    required:true
  } 
  
});

module.exports = mongoose.model('Filedetail', FileSchema);
