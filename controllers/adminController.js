const { Product, ProductCategory, Post, PickupPoint, Order } = require('../models/models')

const createProduct = (req, res) => {
    if (req.body) {
        console.log(req.file.originalname)
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            //image: req.body.image,
            image:'products/' +  req.file.originalname,
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
           
            res.redirect('/admin')
        })
    }
    else {
        res.send('нет данных')
    }
}

const createPost = (req, res) => {
    Post.create({
        title: req.body.title,
        text: req.body.text,
        img: req.body.img
        // img: `posts/${req.file.originalname}`
    }).then(() => {
        res.redirect('/admin')
    })
}

const createPoint = (req, res) => {
    PickupPoint.create({
        adress: req.body.adress
    }).then(() => {
        res.redirect('/admin')
    })
}

const changeStatusView = (req, res) => {
    Order.findByPk(req.params.id).then(order => {
        res.render('admin/changeStatus', { order: order })
    })
}

const changeStatus = (req, res) => {
    Order.update({ status: req.body.status, }, { where: { id: req.params.id } }).then(() => {
        res.redirect('/admin')
    })
}

module.exports = { createProduct, createCategory, createPost, createPoint, changeStatusView, changeStatus }