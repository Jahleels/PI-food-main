const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('mix', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1
        }
    }, {timestamps: false})
}