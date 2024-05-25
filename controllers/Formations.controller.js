const Formation = require('../models/Formation');
const { uploadToCloudinary, removeFromCloudinary } = require('../config/cloudinary');

const FormationController = {
  getAllFormations: async (req, res) => {
    try {
      const formations = await Formation.find().populate('categorie');
      res.status(200).json(formations);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  getFormationById: async (req, res) => {
    const id = req.params.id;

    try {
      const formation = await Formation.findById(id).populate('categorie');

      if (formation) {
        res.status(200).json(formation);
      } else {
        res.status(404).send('Formation non trouvée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  createFormation: async (req, res) => {
    const { nomformation, duree, description, prix, niveau, categorie } = req.body;

    try {
        // Ensure imageUrl is set to req.cloudinaryUrl
        const imageUrl = req.cloudinaryUrl || '';

        // Create the formation with imageUrl
        const nouvelleFormation = await Formation.create({
            nomformation,
            duree,
            description,
            prix,
            image: imageUrl,
            niveau,
            categorie,
        });

        res.status(201).json(nouvelleFormation);
    } catch (error) {
        console.error('Error creating formation:', error);
        res.status(500).send('Erreur serveur: ' + error.message);
    }
},

  
updateFormationImage: async (req, res) => {
  const id = req.params.id;

  try {
    const formation = await Formation.findById(id);
    if (!formation) {
      return res.status(404).send('Formation non trouvée');
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer); // Pass file buffer to uploadToCloudinary function
      if (result && result.secure_url) {
        formation.image = result.secure_url;
        await formation.save();
        return res.status(200).json(formation);
      } else {
        throw new Error("Image upload failed");
      }
    } else {
      return res.status(400).send('Aucune image fournie');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
},

updateFormation: async (req, res) => {
    const { nomformation, duree, description, prix, niveau, categorie } = req.body;
    const id = req.params.id;

    try {
        let updateData = { nomformation, duree, description, prix, niveau, categorie };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            if (result && result.secure_url) {
                updateData.image = result.secure_url;
            } else {
                throw new Error("Image upload failed");
            }
        }

        const formationMaj = await Formation.findByIdAndUpdate(id, updateData, { new: true }).populate('categorie');

        if (formationMaj) {
            res.status(200).json(formationMaj);
        } else {
            res.status(404).send('Formation non trouvée');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
},


  getFormationsByCategorie: async (req, res) => {
    const categorieId = req.params.categorieId;

    try {
      const formations = await Formation.find({ categorie: categorieId }).populate('categorie');

      if (formations.length > 0) {
        res.status(200).json(formations);
      } else {
        res.status(404).send('Aucune formation trouvée pour cette catégorie');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },


  deleteFormation: async (req, res) => {
    const id = req.params.id;

    try {
      const formationSupprime = await Formation.findByIdAndDelete(id).populate('categorie');

      if (formationSupprime) {
        res.status(200).json(formationSupprime);
      } else {
        res.status(404).send('Formation non trouvée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
  
};





module.exports = FormationController;