const router = require('express').Router()
const { createProduct, createCategory, createPost, createPoint, changeStatus, changeStatusView } = require('../controllers/adminController')
const { ProductCategory, Order, User, PickupPoint, Product } = require('../models/models')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false, });

router.get('/', (req, res) => {
    if (req.cookies.role == 'ADMIN') {
        let data = []
        Order.findAll().then(order => {
            for (let i = 0; i < order.length; i++) {

                User.findByPk(order[i].userId).then(user => {
                    PickupPoint.findByPk(order[i].pickuppointId).then(pip => {
                        Product.findByPk(order[i].productId).then(product => {
                            let val = {
                                id: order[i].id,
                                user: `${user.name} - ${user.email}`,
                                pickuppoint: pip.adress,
                                status: order[i].status,
                                product: product.name
                            }

                            data.push(val)
                        })
                    })
                })

            }
            res.render('admin/admin', { order: data })
        })

    } else {
        res.redirect('/')
    }
})

router.get('/create', (req, res) => {
    ProductCategory.findAll().then(category => {
        res.render('admin/createProduct', { category: category })
    })
})
router.post('/create', createProduct)

router.get('/createCat', (req, res) => { res.render('admin/createCat') })
router.post('/createCat', urlencodedParser, createCategory)

router.get('/createPost', (req, res) => { res.render('admin/createPost') })
router.post('/createPost', urlencodedParser, createPost)

router.get('/createPoint', (req, res) => { res.render('admin/createPoint') })
router.post('/createPoint', createPoint)


router.get('/changeStatus/:id', changeStatusView)
router.post('/changeStatus/:id', changeStatus)

module.exports = router