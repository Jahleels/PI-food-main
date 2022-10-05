const { Router } = require('express');
const recipeRouter = require('./Recipe');
const dietRouter = require('./Diet');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietRouter);

router.use('/recipes', recipeRouter)


module.exports = router;
