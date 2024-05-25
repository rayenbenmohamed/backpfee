const Categorie = require('../models/Categorie');

const CategorieController = {
  // Other methods...const CategorieController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Categorie.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  getCategorieById: async (req, res) => {
    const id = req.params.id;

    try {
      const categorie = await Categorie.findById(id);

      if (categorie) {
        res.status(200).json(categorie);
      } else {
        res.status(404).send('Catégorie non trouvée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  createCategorie: async (req, res) => {
    const { nom, description, image } = req.body;

    try {
      const nouvelleCategorie = await Categorie.create({
        nom,
        description,
        image
      });

      res.status(201).json(nouvelleCategorie);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  updateCategorie: async (req, res) => {
    const id = req.params.id;
    const { nom, description, image } = req.body;

    try {
      const categorieMaj = await Categorie.findByIdAndUpdate(
        id,
        {
          nom,
          description,
          image
        },
        { new: true }
      );

      if (categorieMaj) {
        res.status(200).json(categorieMaj);
      } else {
        res.status(404).send('Catégorie non trouvée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
  deleteCategorie: async (req, res) => {
    const id = req.params.id;

    try {
      const categorieSupprimee = await Categorie.findByIdAndDelete(id);

      if (categorieSupprimee) {
        res.status(200).json({ message: 'Catégorie supprimée avec succès', categorie: categorieSupprimee });
      } else {
        res.status(404).send('Catégorie non trouvée');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },
};

module.exports = CategorieController;
