// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Compte = require('../models/Compte'); // Assurez-vous que le chemin est correct
const EtudiantController= require('../controllers/Etudiant.controller')
const Etudiant =require('../models/Etudiant')
const Module = require('../models/Module');
const Formation= require('../models/Formation');
const Emploi= require('../models/Emploi');
const Enseignant= require('../models/Enseignant')



exports.register = async (req, res) => {
  const { nomUtilisateur, motDePasse, role } = req.body;
  try {
    let utilisateur = await Compte.findOne({ nomUtilisateur });
    if (utilisateur) {
      return res.status(400).send('Utilisateur déjà existant.');
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    utilisateur = new Compte({
      nomUtilisateur,
      motDePasse: hashedPassword,
      role
    });

    await utilisateur.save();

    // Générer le token
    const token = jwt.sign({ _id: utilisateur._id, role: utilisateur.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Stocker le token dans le modèle de compte
    utilisateur.token = token;
    await utilisateur.save();

    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send('Erreur serveur.');
  }
};


exports.login = async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;

  try {
    // Rechercher l'utilisateur par nom d'utilisateur
    const compte = await Compte.findOne({ nomUtilisateur });
    if (!compte) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(motDePasse, compte.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Générer le token JWT pour l'authentification réussie
    const token = jwt.sign({ id: compte._id, role: compte.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Traitement basé sur le rôle de l'utilisateur
    switch (compte.role) {
      case "formateur":
        // Trouver l'enseignant associé à ce compte
        const enseignant = await Enseignant.findOne({ compte: compte._id });
        if (!enseignant) {
          return res.status(404).json({ message: "Aucun enseignant trouvé pour ce compte." });
        }

        // Récupérer les modules enseignés par cet enseignant
        const modulesEnseignant = await Module.find({ enseignant: enseignant._id }).populate('etudiants emploi formations');

        // Préparer les détails des modules pour la réponse
        const detailedModulesEnseignant = modulesEnseignant.map(module => ({
          idModule: module._id,
          nomModule: module.nomModule,
          etudiants: module.etudiants,
          emploi: module.emploi,
          formations: module.formations
        }));

        res.json({
          token,compte,
          formateur: {
            nom: enseignant.nom,
            prenom: enseignant.prenom,
            modules: detailedModulesEnseignant
          }
        });
        break;

      case "candidat":
        // Trouver l'étudiant associé à ce compte
        const etudiant = await Etudiant.findOne({ compte: compte._id });
        if (!etudiant) {
          return res.status(404).json({ message: "Aucun étudiant trouvé pour ce compte." });
        }

        // Récupérer les modules associés à l'étudiant
        const modulesEtudiant = await Module.find({ etudiants: etudiant._id }).populate('enseignant emploi formations');

        // Préparer les détails des modules pour l'étudiant
        const detailedModulesEtudiant = modulesEtudiant.map(module => ({
          idModule: module._id,
          nomModule: module.nomModule,
          enseignant: module.enseignant,
          emploi: module.emploi,
          formations: module.formations,
          documents:module.documents
        }));

        res.json({
          token,compte,
          etudiant: {
            nom: etudiant.nom,
            prenom: etudiant.prenom,
            modules: detailedModulesEtudiant
          }
        });
        break;
        case "admin":
          // Find the admin details, if any specific data needs to be fetched
         
  
          // Possibly retrieve other data needed for the admin
          // For example, fetch all users if admin can view/edit all users
         
          res.json({
            token,
            compte,
     // This is just an example of what you might return
            
          });
          break;
  
       

      default:
        res.status(404).json({ message: "Type de compte non supporté." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


exports.getModuleInfo = async (req, res) => {
  try {
    // Trouver l'étudiant associé au compte de l'utilisateur authentifié
    const etudiant = await Etudiant.findOne({ compte: req.user.id }).populate('module');
    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    // Si l'étudiant est trouvé mais n'a pas de module associé
    if (!etudiant.module) {
      return res.status(404).json({ message: 'Module non trouvé pour cet étudiant.' });
    }

    // Répondre avec les informations du module
    res.json(etudiant.module);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur.');
  }
};
