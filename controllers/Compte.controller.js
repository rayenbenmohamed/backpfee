const Compte = require('../models/Compte');
const { uploadToCloudinary, removeFromCloudinary } = require('../config/cloudinary');

const CompteController = {
  
  activerCompte: async (req, res) => {
    const id = req.params.id;

    try {
      const compte = await Compte.findByIdAndUpdate(id, { estActive: true }, { new: true });

      if (compte) {
        res.status(200).json(compte);
      } else {
        res.status(404).send('Compte non trouvé');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
  addImageToCompte: async (req, res) => {
    const { id } = req.params;  // Assuming the compte's ID is passed as a URL parameter
    const imageUrl = req.cloudinaryUrl || '';

    try {
      const compte = await Compte.findByIdAndUpdate(id, { imageUrl: imageUrl }, { new: true });
      if (compte) {
        res.status(200).json(compte);
      } else {
        res.status(404).send('Compte not found');
      }
    } catch (error) {
      console.error('Error updating compte:', error);
      res.status(500).send('Erreur serveur');
    }
  },
  updateImageToCompte: async (req, res) => {
    const { id } = req.params;
    try {
      const compte = await Compte.findById(id);
      if (!compte) {
        return res.status(404).send('Compte not found');
      }

      // Existing image handling: Remove if present
      if (compte.imageUrl) {
        const publicId = compte.imageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL
        await removeFromCloudinary(publicId);
      }

      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);
      compte.imageUrl = result.secure_url; // Update the new image URL

      // Save the updated compte
      await compte.save();

      res.status(200).json({ message: "Image updated successfully", imageUrl: compte.imageUrl });
    } catch (error) {
      console.error('Error updating compte image:', error);
      res.status(500).send('Internal Server Error');
    }
  },

};

module.exports = CompteController;
