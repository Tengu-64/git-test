const router = require('express').Router()
const { indexPage, biography, auth, registration, userPage, basketPage, AllPosts, postId, deleteBasketProduct, createOrder, orderView } = require('../controllers/indexController')
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', indexPage)
router.get('/biography', biography)

router.get('/authorization', (req, res) => {
    res.render('authorization', { 'title': 'авторизация' })
})
router.post('/authorization', urlencodedParser, auth)


router.get('/registration', (req, res) => {
    res.render('registration', { 'title': 'регистрация' })
})
router.post('/registration',
    [
        body('name').isLength({ min: 5 }).withMessage('Имя пользователя должно содержать как минимум 3 символа'),
        body('email').isEmail().withMessage('Введите правильный адрес электронной почты'),
        body('password').isLength({ min: 3 }).withMessage('Пароль должен содержать как минимум 6 символов'),
    ], registration)

router.get('/user/:id', userPage)

router.get('/basket', basketPage)
router.post('/basket/deleteproduct/:id', deleteBasketProduct)
router.post('/basket/createOrder', createOrder)

router.get('/order', orderView)

router.get('/post', AllPosts)
router.get('/post/:id', postId)


module.exports = router