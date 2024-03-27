const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING(1500) },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING }
})

module.exports = {product}