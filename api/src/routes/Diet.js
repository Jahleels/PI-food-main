const { Router } = require('express')
const router = Router()
const dietController = require('../controllers/DietController')

router.get('/', dietController.getDiets)

module.exports = router;