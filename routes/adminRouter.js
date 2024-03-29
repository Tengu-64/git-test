const router = require('express').Router()
const { createProduct, createCategory } = require('../controllers/adminController')
const { ProductCategory } = require('../models/models')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false, });

router.get('/', (req, res) => {
    res.render('admin/admin')
})

router.get('/create', (req, res) => {
    ProductCategory.findAll().then(category => {
        res.render('admin/createProduct', { category: category })
    })
})
router.post('/create', createProduct)

router.get('/createCat', (req, res) => { res.render('admin/createCat') })
router.post('/createCat', urlencodedParser, createCategory)

module.exports = router