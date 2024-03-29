const router = require('express').Router()
const {productAll, productId, Manga, Merch} = require('../controllers/productController')

router.get('/', productAll)
router.get('/manga', Manga)
router.get('/merch', Merch)
router.get('/:id', productId)

module.exports = router
