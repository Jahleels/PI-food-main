const { Diet } = require("../db.js");

module.exports = {
  getDiets: async (req, res) => {
    try {
        const diets = await Diet.findAll();
        res.json(diets);
    } catch(e){
        res.status(400).send({msd:e.message})
    }
  },
};
