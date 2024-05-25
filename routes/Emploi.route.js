const express = require('express');
const router = express.Router();
const emploiController = require('../controllers/Emploi.controller');

// Créer un emploi
router.post('/emplois', emploiController.createEmploi);

// Lire tous les emplois
router.get('/emplois', emploiController.getAllEmplois);

// Lire un emploi par ID
router.get('/emplois/:id', emploiController.getEmploiById);

// Mettre à jour un emploi par ID
router.put('/emplois/:id', emploiController.updateEmploi);

// Supprimer un emploi par ID
router.delete('/emplois/:id', emploiController.deleteEmploi);

module.exports = router;
