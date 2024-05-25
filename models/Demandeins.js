const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const demandeinsSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    Prenom: {
        type: String,
        required: true
    },
   
    cin: {
        type: String,
        required: true,
        unique: true
    },
    date_naissance: {
        type: Date,
        required: true
    },
    numTel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Formation: {
        type: Schema.Types.ObjectId,
        ref: 'Formation'
    },
    niveauScolaire: {
        type: String,
        required: true,
        
    },
   
});

const Demandeins = mongoose.model('Demandeins', demandeinsSchema);

module.exports = Demandeins;
