const router = require('express').Router()
const { productAll, productId, Manga, Merch, addBasket, addLikeProducts } = require('../controllers/productController')

router.get('/', productAll)
router.get('/manga', Manga)
router.get('/merch', Merch)
router.get('/:id', productId)
router.post('/:id', addBasket)

module.exports = router
