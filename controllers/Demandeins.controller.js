const Demandeins = require('../models/Demandeins');
const Formation = require('../models/Formation');

const DemandeinsController = {
    // Créer une nouvelle demande d'inscription
    createDemandeins: async (req, res) => {
        const { formationId } = req.params; // Récupérer l'ID de la formation depuis les paramètres de l'URL
        const { nom, Prenom, cin, numTel, date_naissance, email,  niveauScolaire,  } = req.body;

        try {
            // Vérifier si la formation existe
            const formation = await Formation.findById(formationId);
            if (!formation) {
                return res.status(404).json({ message: 'Formation non trouvée' });
            }

            // Créer la nouvelle demande d'inscription
            const newDemandeins = new Demandeins({
                nom,
                Prenom,
                cin,
                numTel,
                date_naissance,
                email,
                Formation: formationId, // Utiliser l'ID de la formation
                niveauScolaire,
                
            });

            const savedDemandeins = await newDemandeins.save();
            res.status(201).json(savedDemandeins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Récupérer toutes les demandes d'inscription
    getAllDemandeins: async (req, res) => {
        try {
            const demandeinsList = await Demandeins.find().populate('Formation');
            res.status(200).json(demandeinsList);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Récupérer une demande d'inscription par ID
    getDemandeinsById: async (req, res) => {
        const { id } = req.params;
        try {
            const demandeins = await Demandeins.findById(id).populate('Formation');
            if (!demandeins) {
                return res.status(404).json({ message: 'Demande d\'inscription non trouvée' });
            }
            res.status(200).json(demandeins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour une demande d'inscription
    updateDemandeins: async (req, res) => {
        const { id } = req.params;
        const { nom, Prenom, adresse, numeroIdentite, dateNaissance, telephone, email, niveauScolaire, etablissementOrigine } = req.body;
        try {
            const updatedDemandeins = await Demandeins.findByIdAndUpdate(
                id,
                { nom, Prenom, adresse, numeroIdentite, dateNaissance, telephone, email, niveauScolaire, etablissementOrigine },
                { new: true, runValidators: true }
            ).populate('Formation');
            if (!updatedDemandeins) {
                return res.status(404).json({ message: 'Demande d\'inscription non trouvée' });
            }
            res.status(200).json(updatedDemandeins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Supprimer une demande d'inscription
    deleteDemandeins: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedDemandeins = await Demandeins.findByIdAndDelete(id);
            if (!deletedDemandeins) {
                return res.status(404).json({ message: 'Demande d\'inscription non trouvée' });
            }
            res.status(200).json({ message: 'Demande d\'inscription supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = DemandeinsController;
