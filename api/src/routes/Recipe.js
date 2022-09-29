const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/RecipeController')

router.get('/', recipeController.getRecipesFromName)

router.get('/:idRecipe', recipeController.getRecipeFromId)

router.post('/', recipeController.postRecipe)

module.exports = router;