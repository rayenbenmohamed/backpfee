const Emploi = require('../models/Emploi');

const emploiController = {
  // Créer un emploi
  createEmploi: async (req, res) => {
    try {
      const nouvelEmploi = new Emploi(req.body);
      const emploiCree = await nouvelEmploi.save();
      res.status(201).json(emploiCree);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lire tous les emplois
  getAllEmplois: async (req, res) => {
    try {
      const emplois = await Emploi.find();
      res.status(200).json(emplois);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lire un emploi par ID
  getEmploiById: async (req, res) => {
    try {
      const emploi = await Emploi.findById(req.params.id);
      if (emploi) {
        res.status(200).json(emploi);
      } else {
        res.status(404).json({ message: 'Emploi non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Mettre à jour un emploi par ID
  updateEmploi: async (req, res) => {
    try {
      const emploiMaj = await Emploi.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (emploiMaj) {
        res.status(200).json(emploiMaj);
      } else {
        res.status(404).json({ message: 'Emploi non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Supprimer un emploi par ID
  deleteEmploi: async (req, res) => {
    try {
      const emploiSupprime = await Emploi.findByIdAndDelete(req.params.id);
      if (emploiSupprime) {
        res.status(200).json({ message: 'Emploi supprimé' });
      } else {
        res.status(404).json({ message: 'Emploi non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = emploiController;
