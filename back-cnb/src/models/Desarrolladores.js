const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("desarrolladores", {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        skills:{
            type:DataTypes.STRING,
            allowNull: false
        },
    })
}