const express = require('express');
const router = express.Router();
const EnseignantController = require('../controllers/Enseignant.controller');

router.get('/enseignants', EnseignantController.getAllEnseignants);
router.get('/enseignants/:id', EnseignantController.getEnseignantById);
router.post('/enseignants', EnseignantController.createEnseignant);
router.put('/enseignants/:id', EnseignantController.updateEnseignant);
router.delete('/enseignants/:id', EnseignantController.deleteEnseignant);
router.post('/enseignants/:id/add-compte', EnseignantController.addCompteToEnseignant);


router.delete('/enseignants/:id/compte', EnseignantController.deleteCompteFromEnseignant);
module.exports = router;