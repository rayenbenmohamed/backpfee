
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursSchema = new Schema({
  coursId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  prix: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
  },
  etudiantsInscrits: [{
    type: Schema.Types.ObjectId,
    ref: 'Etudiant',
  }],
  emplois: [{
    type: Schema.Types.ObjectId,
    ref: 'Emploi',
  }],
  categorie: [{
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
  }],
});

const Cours = mongoose.model('Cours', coursSchema);

module.exports = Cours;
