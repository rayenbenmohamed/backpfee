const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceSchema = new Schema({
  etudiants: [{
    type: Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true
  }],
  module: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  sessionNumber: {
    type: Number,
    required: true
  }
},);

const Absence = mongoose.model('Absence', absenceSchema);

module.exports = Absence;