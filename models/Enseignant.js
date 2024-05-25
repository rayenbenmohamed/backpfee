const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const enseignantSchema = new mongoose.Schema({
  
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  numTel: {
    type: Number,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cin:{
    type: String,
    required: true,
    unique: true,
  },
  certificat:{
    type:String,
    required: true,

  },
  compte: {
    type: Schema.Types.ObjectId,
    ref: 'Compte',
  }
  
});

const Enseignant = mongoose.model('Enseignant', enseignantSchema);

module.exports = Enseignant;