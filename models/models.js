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
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

// корзина
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    //user_id
    //product_id
})

// посты
const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true }
})

//пункт выдачи
const PickupPoint = sequelize.define('pickuppoint', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    adress: { type: DataTypes.STRING }
})

//заказы
const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    status: { type: DataTypes.STRING, allowNull: false }
    //pickupPointId
    //userId
    //productId
})

ProductCategory.hasMany(Product)
Product.hasMany(ProductCategory)
User.hasMany(Basket)
Product.hasMany(Basket)
PickupPoint.hasMany(Order)
User.hasMany(Order)
Product.hasMany(Order)

module.exports = { Product, ProductCategory, User, Basket, Post, PickupPoint, Order }