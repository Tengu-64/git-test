const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING(1500) },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING }
    //cat_id
})

const ProductCategory = sequelize.define('product_category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false, unique: true }
})

// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     name:{},
//     email:{},
//     password:{},
//     role:{},

// })

ProductCategory.hasMany(Product)
Product.belongsTo(ProductCategory)

module.exports = { Product, ProductCategory }