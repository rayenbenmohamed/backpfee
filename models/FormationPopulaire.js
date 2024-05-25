const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationPopulaireSchema = new Schema({
    formation: {
        type: Schema.Types.ObjectId,
        ref: 'Formation',
        required: true
    },
    // Additional fields if needed
});

const FormationPopulaire = mongoose.model('FormationPopulaire', formationPopulaireSchema);

module.exports = FormationPopulaire;
