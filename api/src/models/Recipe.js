const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type:DataTypes.TEXT,
      allowNull: false
     },
     healthScore:{
      type:DataTypes.INTEGER
     },
     procedure:{
      type:DataTypes.ARRAY(DataTypes.JSON)
     },
     img:{
      type:DataTypes.STRING
     }
  });
};
