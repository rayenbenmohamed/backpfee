const Note = require('../models/Note');

const NoteController = {
    // Method to add notes for a specific module and student
    addNotes: async (req, res) => {
        const { moduleId, etudiantId } = req.params;
        const { note, commentaire } = req.body;

        const newNote = new Note({
            etudiant: etudiantId,
            module: moduleId,
            note,
            commentaire
        });

        try {
            const savedNote = await newNote.save();
            res.status(201).json(savedNote);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Method to update a note by ID
    updateNote: async (req, res) => {
        const { id } = req.params;
        const { note, commentaire } = req.body;

        try {
            const updatedNote = await Note.findByIdAndUpdate(
                id,
                { note, commentaire },
                { new: true, runValidators: true }
            ).populate('etudiant module');
            if (!updatedNote) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(200).json(updatedNote);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Method to delete a note by ID
    deleteNote: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedNote = await Note.findByIdAndDelete(id);
            if (!deletedNote) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(200).json({ message: 'Note deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getNotesByModuleId: async (req, res) => {
      const { moduleId } = req.params;
      try {
          const notes = await Note.find({ module: moduleId })
              .populate({
                  path: 'etudiant',
                  select: 'nom prenom email'  // Adjust this to include the fields you want from the Etudiant model
              })
              .select('note commentaire -_id');  // Selects only note and commentaire fields, excludes _id field

          res.status(200).json(notes);
      } catch (error) {
          console.error('Failed to retrieve notes by module:', error);
          res.status(500).send('Server Error');
      }
  },

  getNotesByEtudiantId: async (req, res) => {
    const { etudiantId } = req.params;
    try {
        const notes = await Note.find({ etudiant: etudiantId })
            .populate({
                path: 'etudiant',
                select: 'nom prenom email'  // Adjust to select the desired fields from the Etudiant model
            })
            .select('note commentaire -_id');  // Selects note and commentaire fields, excludes _id field

        // Check if we have notes and return them along with the student info
        if (notes.length > 0) {
            const studentInfo = {
                etudiant: notes[0].etudiant,  // Assuming all notes will have the same student details
                notes: notes.map(note => ({ note: note.note, commentaire: note.commentaire }))
            };
            res.status(200).json(studentInfo);
        } else {
            res.status(404).send('No notes found for the specified student');
        }
    } catch (error) {
        console.error('Failed to retrieve notes for student:', error);
        res.status(500).send('Server Error');
    }
}
};

module.exports = NoteController;

