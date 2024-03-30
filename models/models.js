const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// товары
const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING(1500) },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING }
    //cat_id
})

// категория товаров
const ProductCategory = sequelize.define('product_category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false, unique: true }
    // product_id
})
 
// пользователь
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {type: DataTypes.STRING, allowNull:false},
    role: {type:DataTypes.STRING, defaultValue: 'USER'},
})

// корзина
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //user_id
    //product_id
})

// понравившиеся товары
const LikedProducts = sequelize.define('Liked_products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
    //user_id
    //product_id
})

ProductCategory.hasMany(Product)
Product.hasMany(ProductCategory)
User.hasMany(Basket)
Product.hasMany(Basket)
User.hasMany(LikedProducts)
Product.hasMany(LikedProducts)


module.exports = { Product, ProductCategory, User, Basket, LikedProducts }