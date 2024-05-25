const express = require('express');
const router = express.Router();
const FormationController = require('../controllers/Formations.controller');
const { multerUpload, upload } = require('../Middleware/upload');  // Ensure correct path

router.put('/formations/:id/image', multerUpload.single('image'), FormationController.updateFormationImage); // New route for updating image
router.get('/formations', FormationController.getAllFormations);
router.get('/formations/:id', FormationController.getFormationById);
router.post('/formations', multerUpload.single('image'), upload, FormationController.createFormation);
router.put('/formations/:id', FormationController.updateFormation);
router.delete('/formations/:id', FormationController.deleteFormation);
router.get('/formations/categorie/:categorieId', FormationController.getFormationsByCategorie);

module.exports = router;
