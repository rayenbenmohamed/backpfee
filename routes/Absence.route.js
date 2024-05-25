const express = require('express');
const router = express.Router();
const AbsenceController = require('../controllers/Absence.controller');

// Routes for Absences
router.get('/absences', AbsenceController.getAllAbsences);
router.get('/absences/:id', AbsenceController.getAbsenceById);
router.put('/absences/:id', AbsenceController.updateAbsence);
router.delete('/absences/:id', AbsenceController.deleteAbsence);
router.get('/modules/:moduleId/absences', AbsenceController.getAbsencesByModuleId);
router.post('/modules/:moduleId/absences', AbsenceController.createAbsence);


module.exports = router;