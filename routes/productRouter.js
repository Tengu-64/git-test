const router = require('express').Router()
const {productAll} = require('../controllers/productController')

router.get('/', productAll)


module.exports = router
