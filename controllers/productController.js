const { where } = require('sequelize')
const { Product } = require('../models/models')

const productAll = (req, res) => {
    Product.findAll().then(prod => {
        res.render('productAll', { title: 'Все товары', product: prod })
    })

}

const productId = (req, res) => {
    Product.findByPk(req.params.id).then(productData => {
        if (!productData) {
            res.render('error', { 'title': 'ERROR404' })
        }
        else{
           res.render('productId', { title: productData.name, name: productData.name, description: productData.description, price: productData.price, image: productData.image }) 
        }
    })
}

const Manga = (req, res) => {
    Product.findAll({ where: { productCategoryId: 1 } }).then(prod => {
        res.render('productAll', { title: 'Манга', product: prod })
    })
}

const Merch = (req, res) => {
    Product.findAll({ where: { productCategoryId: 2 } }).then(prod => {
        res.render('productAll', { title: 'Одежда и мерч', product: prod })
    })
}

module.exports = { productAll, productId, Manga, Merch }