const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  nomformation: {
    type: String,
    required: true,
    trim: true
  },
  duree: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    required: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  }
}); 

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
