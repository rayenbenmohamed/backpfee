const Absence = require('../models/Absence');
const Module = require('../models/Module');

const AbsenceController = {
    getAllAbsences: async (req, res) => {
        try {
            const absences = await Absence.find().populate('etudiants').populate('module');
            res.status(200).json(absences);
        } catch (error) {
            console.error('Error fetching absences:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getAbsenceById: async (req, res) => {
        const { id } = req.params;
        try {
            const absence = await Absence.findById(id).populate('etudiants').populate('module');
            if (absence) {
                res.status(200).json(absence);
            } else {
                res.status(404).send('Absence not found');
            }
        } catch (error) {
            console.error('Error finding absence:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateAbsence: async (req, res) => {
        const { id } = req.params;
        const { etudiants, date, sessionNumber } = req.body;
        try {
            const updatedAbsence = await Absence.findByIdAndUpdate(
                id,
                { etudiants, date, sessionNumber },
                { new: true, runValidators: true }
            ).populate('etudiants').populate('module');
            if (updatedAbsence) {
                res.status(200).json(updatedAbsence);
            } else {
                res.status(404).send('Absence not found');
            }
        } catch (error) {
            console.error('Error updating absence:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteAbsence: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedAbsence = await Absence.findByIdAndDelete(id);
            if (deletedAbsence) {
                res.status(200).send({ message: 'Absence deleted successfully' });
            } else {
                res.status(404).send('Absence not found');
            }
        } catch (error) {
            console.error('Error deleting absence:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getAbsencesByModuleId: async (req, res) => {
      const { moduleId } = req.params;
      try {
          const absences = await Absence.find({ module: moduleId })
              .populate('etudiants', 'nom prenom email') // assuming you want to get only specific fields from etudiants
              .populate('module', 'nomModule'); // assuming you want to get the module name
          if (absences.length > 0) {
              res.status(200).json(absences);
          } else {
              res.status(404).send('No absences found for this module');
          }
      } catch (error) {
          console.error('Error fetching absences by module ID:', error);
          res.status(500).send('Internal Server Error');
      }
  },
  createAbsence: async (req, res) => {
    const { etudiantIds, date } = req.body;  // Extract etudiantIds and date from request body
    const { moduleId } = req.params; // Extract moduleId from URL parameters

    try {
        // Validate the module exists
        const moduleExists = await Module.findById(moduleId);
        if (!moduleExists) {
            return res.status(404).send('Module not found');
        }

        // Find the last session number for this specific module
        const lastAbsence = await Absence.findOne({ module: moduleId }).sort({ sessionNumber: -1 }).exec();
        const newSessionNumber = lastAbsence ? lastAbsence.sessionNumber + 1 : 1;

        // Create a new absence
        const newAbsence = new Absence({
            etudiants: etudiantIds,
            module: moduleId,
            date: date,
            sessionNumber: newSessionNumber
        });

        // Save the new absence
        const savedAbsence = await newAbsence.save();
        res.status(201).json({ message: 'Absence created successfully', absence: savedAbsence });
    } catch (error) {
        console.error('Failed to create absence:', error);
        res.status(500).send('Internal Server Error');
    }
}

};

module.exports = AbsenceController;