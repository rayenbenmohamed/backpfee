const express = require('express');
const router = express.Router();
const formationPopulaireController = require('../controllers/FormationPopulaire.controller');

// Route to mark a formation as popular
router.post('/popularFormations/:formationId', formationPopulaireController.addPopularFormation);

// Route to delete a popular formation
router.delete('/popularFormations/:id', formationPopulaireController.deletePopularFormation);
router.get('/popularFormations', formationPopulaireController.getAllPopularFormations);

module.exports = router;
