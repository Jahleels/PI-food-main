const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV1,
            primaryKey: true,
            unique: true
        },
       name:{
        type:DataTypes.STRING
       }
    })
}