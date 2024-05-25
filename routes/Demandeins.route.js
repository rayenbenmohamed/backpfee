const express = require('express');
const router = express.Router();
const demandeinsController = require('../controllers/Demandeins.controller');

// Route pour créer une nouvelle demande d'inscription avec l'ID de la formation dans l'URL
router.post('/formation/:formationId', demandeinsController.createDemandeins);

// Route pour récupérer toutes les demandes d'inscription
router.get('/demande', demandeinsController.getAllDemandeins);

// Route pour récupérer une demande d'inscription par ID
router.get('/demande/:id', demandeinsController.getDemandeinsById);

// Route pour mettre à jour une demande d'inscription
router.put('/demande/:id', demandeinsController.updateDemandeins);

// Route pour supprimer une demande d'inscription
router.delete('/demande/:id', demandeinsController.deleteDemandeins);

module.exports = router;
