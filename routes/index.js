const router = require('express').Router()

router.get('/', (req, res) => {
    const data_home = { 'title': 'манга Дзюндзи Ито' }
    res.render('index', data_home)
})

router.get('/biography', (req, res) => {
    const data_biography = { 'title': 'биография дзюндзи ито' }
    res.render('biography', data_biography)
})


router.get('/authorization', (req, res) => {
    const data_registration = { 'title': 'авторизация' }
    res.render('authorization', data_registration)
})

router.get('/registration', (req, res) => {
    res.render('registration', { 'title': 'регистрация' })
})

router.post('/user-data', (req, res) => {
    res.send(req.body)
})

module.exports = router