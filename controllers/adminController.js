const { Product, ProductCategory } = require('../models/models')

const createProduct = (req, res) => {
    if (req.body) {
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            productCategoryId: req.body.category
        }).then(() => {
            res.redirect('/admin')
        })
    }
    else {
        res.send('нет данных')
    }
}

const createCategory = (req, res) => {
    if (req.body) {
        ProductCategory.create({
            category: req.body.category
        }).then(() => {
            console.log('---')
            console.log(req.body.category)
            console.log('---')
            res.redirect('/admin')
        })
    }
    else {
        res.send('нет данных')
    }
}

module.exports = { createProduct, createCategory }