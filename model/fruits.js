const Sequelize = require('sequelize');
const sequelize = require('../database');
const fruits =sequelize.define('Fruits', {
    id:{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    amtperkg:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false,
})



module.exports = fruits