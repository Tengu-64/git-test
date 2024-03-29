const router = require('express').Router()
const {indexPage, biography, auth, registration} = require('../controllers/indexController')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', indexPage)

router.get('/biography', biography)


router.get('/authorization', auth)

router.get('/registration', registration)


module.exports = router