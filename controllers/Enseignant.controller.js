const Enseignant = require('../models/Enseignant');
const Compte=require('../models/Compte')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure this is added


const EnseignantController = {
  getAllEnseignants: async (req, res) => {
    try {
      const enseignants = await Enseignant.find();
      res.status(200).json(enseignants);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  getEnseignantById: async (req, res) => {
    const id = req.params.id;

    try {
      const enseignant = await Enseignant.findById(id);

      if (enseignant) {
        res.status(200).json(enseignant);
      } else {
        res.status(404).send('Enseignant non trouvé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  createEnseignant: async (req, res) => {
    const { nom, prenom, email, cin, certificat, numTel} = req.body;

    try {
      const nouvelEnseignant = await Enseignant.create({
        nom,
        prenom,
        email,
        cin,
        certificat,
        numTel
      });

      res.status(201).json(nouvelEnseignant);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  updateEnseignant: async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, cin, certificat, numTel} = req.body;

    try {
      const enseignantMaj = await Enseignant.findByIdAndUpdate(id, {
        nom,
        prenom,
        email,
        cin,
        certificat,
        numTel,
      }, { new: true });

      if (enseignantMaj) {
        res.status(200).json(enseignantMaj);
      } else {
        res.status(404).send('Enseignant non trouvé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  deleteEnseignant: async (req, res) => {
    const id = req.params.id;

    try {
      const enseignantSupprime = await Enseignant.findByIdAndDelete(id);

      if (enseignantSupprime) {
        res.status(200).json(enseignantSupprime);
      } else {
        res.status(404).send('Enseignant non trouvé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
  addCompteToEnseignant: async (req, res) => {
    const id = req.params.id; // Get the enseignant ID from the URL
    const { nomUtilisateur, motDePasse } = req.body;
    if (!nomUtilisateur || !motDePasse) {
      return res.status(400).send('Username and password are required.');
    }
    const role = "formateur";

    try {
      // Find the enseignant by ID
      const enseignant = await Enseignant.findById(id);
      if (!enseignant) {
        return res.status(404).send('Enseignant non trouvé.');
      }

      // Check if the username already exists
      let utilisateur = await Compte.findOne({ nomUtilisateur });
      if (utilisateur) {
        return res.status(400).send('Nom d\'utilisateur déjà existant.');
      }

      if (!motDePasse || motDePasse.trim() === '') {
        return res.status(400).send('Mot de passe requis.');
      }
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      

      // Create a new compte (account)
      utilisateur = new Compte({
        nomUtilisateur,
        motDePasse: hashedPassword,
        role
      });

      // Save the compte
      await utilisateur.save();

      // Assign the compte to the enseignant
      enseignant.compte = utilisateur._id;
      await enseignant.save();

      // Generate the token
      const token = jwt.sign({ _id: utilisateur._id, role: utilisateur.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

      // Store the token in the compte model
      utilisateur.token = token;
      await utilisateur.save();

      res.status(201).send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur.');
    }
  },
  deleteCompteFromEnseignant: async (req, res) => {
    const enseignantId = req.params.id; // Get the enseignant ID from the URL

    try {
      // Find the enseignant by ID
      const enseignant = await Enseignant.findById(enseignantId);
      if (!enseignant) {
        return res.status(404).send('Enseignant non trouvé');
      }

      const compteId = enseignant.compte; // Assume compte is the ID of the associated compte
      if (!compteId) {
        return res.status(404).send('Compte non trouvé pour cet enseignant');
      }

      // Delete the associated compte
      await Compte.findByIdAndDelete(compteId);

      // Optionally remove the reference to the compte in the enseignant object
      enseignant.compte = null;
      await enseignant.save();

      // Optionally, delete the enseignant as well if desired
      // await Enseignant.findByIdAndDelete(enseignantId);

      res.status(200).send('Compte et/ou enseignant supprimé avec succès');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
};

module.exports = EnseignantController;