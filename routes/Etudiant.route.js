const express=require('express');
const router= express.Router();
 const Etudiantcontroller=require('../controllers/Etudiant.controller');
 const CompteController=require('../controllers/Compte.controller');
const moduleController=require('../controllers/Module.controller');

const { getModuleByToken } = require('../controllers/Etudiant.controller');



 router.get('/etudiants',Etudiantcontroller.getAllEtudiants);

 router.get('/etudiants/:id',Etudiantcontroller.getEtudiantById );

 router.post('/etudiants',Etudiantcontroller.createEtudiant);

// Exemple de route PUT correctement définie
router.put('/etudiants/:id',Etudiantcontroller.updateEtudiant);

 router.delete('/etudiants/:id',Etudiantcontroller.deleteEtudiant);
 router.post('/etudiant/:id/compte', Etudiantcontroller.addCompteToEtudiant);
 router.put('/comptes/:id/activer', CompteController.activerCompte);
 router.get('/etudiants/formation/:compteId', Etudiantcontroller.getFormationByCompte);
 router.get('/etudiants/byCompte/:compteId', Etudiantcontroller.getEtudiantByCompte);

 


 

 

 
 module.exports=router
