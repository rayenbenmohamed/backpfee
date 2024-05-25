const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
 
  
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  date_naissance: {
    type: Date,
    required: true
  },
  numTel: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  cin: {
    type: String, 
    unique: true,
  },
  niveauScolaire: {
    type: String, 
  },
  montanAtpaye:{
    type: Number,
    
  },
  
  compte: {
    type: Schema.Types.ObjectId,
    ref: 'Compte',
  },

});


const Etudiant = mongoose.model('Etudiant', etudiantSchema);

module.exports = Etudiant;
