const mongoose = require('mongoose');

const plageHoraireSchema = new mongoose.Schema({
  heureDebut: String,
  heureFin: String,
});

const emploiSchema = new mongoose.Schema({
 
  nom: String, // New attribute
  lundi: [plageHoraireSchema],
  mardi: [plageHoraireSchema],
  mercredi: [plageHoraireSchema],
  jeudi: [plageHoraireSchema],
  vendredi: [plageHoraireSchema],
  samedi: [plageHoraireSchema],
  dimanche: [plageHoraireSchema]
});

const Emploi = mongoose.model('Emploi', emploiSchema);

module.exports = Emploi;
