const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
       name:{
        type:DataTypes.STRING,
        get(){
            let value = this.getDataValue('name')
            return value.replace(/\w\S*/g,(w)=>(w.replace(/^\w/,(c)=>c.toUpperCase())))
        }
       }
    }, {timestamps: false})
}