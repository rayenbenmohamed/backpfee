
const moduleController = require('../controllers/Module.controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addDocumentToModule } = require('../controllers/Module.controller');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/modules', moduleController.getAllModules);
router.get('/modules/:id', moduleController.getModuleById);
router.post('/modules', moduleController.createModule);
router.put('/modules/:id', moduleController.updateModule);
router.delete('/modules/:id', moduleController.deleteModule);
router.post('/modules/:moduleId/addStudent/:etudiantId', moduleController.addStudentToGroup);
router.delete('/modules/:moduleId/students/:etudiantId', moduleController.removeStudentFromGroup);
router.post('/modules/:moduleId/addEmploi/:emploiId', moduleController.addEmploiToModule);
router.get('/modules/:moduleId/students/notInModule', moduleController.getStudentsNotInModule);
router.delete('/modules/:moduleId/emploi/:emploiId', moduleController.deleteEmploiFromModule);
router.post('/modules/:moduleId/documents', upload.single('file'), addDocumentToModule);
router.delete('/modules/:moduleId/documents/:documentId', moduleController.removeDocumentFromModule);
router.get('/modules/enseignant/:enseignantId', moduleController.getModulesByEnseignant);

module.exports = router;
