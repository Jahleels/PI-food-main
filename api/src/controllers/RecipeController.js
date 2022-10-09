const { Recipe } = require('../db.js')
const { Op } = require('sequelize')

module.exports = {
    getRecipesList: async (req, res) => {

        try {
            const recipes = await Recipe.findAll({
                attributes:['id', 'name', 'summary', 'img']
            })
            res.json(recipes)
        } catch(e) {
            res.status(400).send({msg: e.message})
        }
    },
    getRecipesFromName: async (req, res) => {
        const { name } = req.query
        const capitalizedName = name.replace(/\w\S*/g,(w)=>(w.replace(/^\w/,(c)=>c.toUpperCase())))
        
        try {
            const recipes = await Recipe.findAll({
                where:{
                    name:{
                        [Op.like]:`%${capitalizedName}%`
                    }}})
            res.json(recipes)
        } catch(e) {
            res.status(404).send({msg: e.message})
        }
    },
    getRecipeFromId: async (req, res) => {
        const { idRecipe } = req.params
        try {
            const recipeFinded = await Recipe.findOne({where: { id: idRecipe}})
            res.json(recipeFinded)
        } catch(e) {
            res.status(404).send({msg:e.message})
        }
    },
    postRecipe: async (req, res) => {
        const { id, name, summary, heathScore, procedure } = req.body
        if(!id || !name || !summary) return res.status(400).send({msg: 'Faltan campos obligatorios'})
        try {
            const newRecipe =  await Recipe.create({id, name, summary, heathScore, procedure})
            newRecipe.save()
            res.status(200).send({msg: 'succesful'})
        } catch(e){
            res.status(409).send({msg: e.message})
        }
    }
}