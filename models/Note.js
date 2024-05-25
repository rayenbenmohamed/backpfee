const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    etudiant: {
      type: Schema.Types.ObjectId,
      ref: 'Etudiant',
      required: true
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    note: {
      type: Number,
      required: true
    },
    commentaire: {
      type: String,
      trim: true
    }
  });
  const Note = mongoose.model('Note', noteSchema);

  module.exports = Note;