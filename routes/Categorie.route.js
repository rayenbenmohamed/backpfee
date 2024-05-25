
const express = require('express');
const router = express.Router();
const CategorieController = require('../controllers/Categorie.controller');


router.get('/categories', CategorieController.getAllCategories);


router.get('/categories/:id', CategorieController.getCategorieById);


router.post('/categories', CategorieController.createCategorie);


router.put('/categories/:id', CategorieController.updateCategorie);


router.delete('/categories/:id', CategorieController.deleteCategorie);

module.exports = router;
