const { User } = require('../models/models')

const indexPage = (req, res) => {
    res.render('index', { title: 'манга Дзюндзи Ито' })
}
const biography = (req, res) => {
    res.render('biography', { 'title': 'биография дзюндзи ито' })
}

const auth = (req, res) => {
    if (req.body) {
        User.findOne({ where: { email: req.body.email, password: req.body.password } }).then(userData => {
            if (userData) {
                res.cookie('id', userData.id)
                res.cookie('name', userData.name)
                res.cookie('email', userData.email)
                res.cookie('password', userData.password)
                res.redirect(`/user/${userData.id}`)
            } else {
                //res.send('не найден пользователь')
                res.render('authorization', { 'title': 'авторизация', errVal: true, err: 'пользователь не найден' })
            }
        })
    } else {
        res.send('недостаточно данных')
    }
}

const registration = (req, res) => {
    if (req.body) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(userData => {
            res.cookie('id', userData.id)
            res.cookie('name', userData.name)
            res.cookie('email', userData.email)
            res.cookie('password', userData.password)
            // res.send(`пользователь ${userData.name} зарегистрирован`)
            console.log('successfull registration')
            res.redirect(`/user/${userData.id}`)

        })
    } else {
        res.send('недостаточно данных')
    }
}

const userPage = (req, res) => {
    User.findOne({ where: { id: req.params.id } }).then(userData => {
        if (userData) {
            res.render('user', { user: userData, title: "профиль", auth:true })
        }
        else {
            res.send('пользователь не найден')
        }
    })
}


module.exports = { indexPage, biography, auth, registration, userPage }