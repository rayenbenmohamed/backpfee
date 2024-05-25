
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
