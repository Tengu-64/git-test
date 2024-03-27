const router = require('express').Router()
const {indexPage, biography, auth, registration} = require('../controllers/indexController')

router.get('/', indexPage)

router.get('/biography', biography)


router.get('/authorization', auth)

router.get('/registration', registration)


// router.post('/user-data', (req, res) => {
//     if (req.body.email == process.env.ADMIN_EMAIL || req.body.password == process.env.ADMIN_PASSWORD) {
//         res.render('admin/admin')
//     } else {
//         res.send(req.body)
//     }
// })

module.exports = router