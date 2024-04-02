const router = require('express').Router()
const { indexPage, biography, auth, registration, userPage } = require('../controllers/indexController')

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
router.post('/registration', urlencodedParser, registration)

router.get('/user/:id', userPage)
// (req,res)=>{res.render('user', {title: 'пользователь', cookies: req.cookies})})

module.exports = router