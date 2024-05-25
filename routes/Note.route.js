// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/Note.controller');

router.post('/modules/:moduleId/etudiants/:etudiantId/notes', NoteController.addNotes);
router.put('/notes/:id', NoteController.updateNote);
router.delete('/notes/:id', NoteController.deleteNote);
router.get('/modules/:moduleId/notes', NoteController.getNotesByModuleId);
router.get('/etudiants/:etudiantId/notes', NoteController.getNotesByEtudiantId);

module.exports = router;
