const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const documentSchema = new Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

const moduleSchema = new Schema({
  nomModule: {
    type: String,
    required: true,
    trim: true
  },
  etudiants: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Etudiant'
    }],
    default: []  
  },
  enseignant: {
    type: Schema.Types.ObjectId,
    ref: 'Enseignant'
  },
  formations: {
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  },
  emploi: {
    type: Schema.Types.ObjectId,
    ref: 'Emploi'
  },
  documents: [documentSchema] 
 
  
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
