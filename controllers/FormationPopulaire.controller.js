const Formation = require('../models/Formation');
const FormationPopulaire = require('../models/FormationPopulaire');

const FormationPopulaireController = {
    addPopularFormation: async (req, res) => {
        const { formationId } = req.params;

        try {
            // Check if the formation exists
            const formation = await Formation.findById(formationId);
            if (!formation) {
                return res.status(404).send('Formation not found');
            }

            // Create a new popular formation
            const newPopularFormation = new FormationPopulaire({ formation: formationId });
            await newPopularFormation.save();

            res.status(201).json({ message: 'Formation marked as popular', data: newPopularFormation });
        } catch (error) {
            console.error('Error marking formation as popular:', error);
            res.status(500).send('Server Error');
        }
    },
    deletePopularFormation: async (req, res) => {
        const { id } = req.params; // The ID of the popular formation entry

        try {
            const deletedPopularFormation = await FormationPopulaire.findByIdAndDelete(id);
            if (!deletedPopularFormation) {
                return res.status(404).send('Popular formation not found');
            }

            res.status(200).json({ message: 'Popular formation deleted successfully' });
        } catch (error) {
            console.error('Error deleting popular formation:', error);
            res.status(500).send('Server Error');
        }
    },
    getAllPopularFormations: async (req, res) => {
        try {
            const popularFormations = await FormationPopulaire.find().populate('formation');
            res.status(200).json(popularFormations);
        } catch (error) {
            console.error('Error fetching popular formations:', error);
            res.status(500).send('Server Error');
        }
    }
};

module.exports = FormationPopulaireController;
