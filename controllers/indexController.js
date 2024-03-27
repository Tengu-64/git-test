const {product} = require('../models/models')

const indexPage = (req,res)=>{
    res.render('index', {title:'манга Дзюндзи Ито'})
}
const biography =  (req, res) => {
    res.render('biography', { 'title': 'биография дзюндзи ито' })
}

const auth = (req, res) => {
    res.render('authorization', { 'title': 'авторизация' })
}

const registration = (req,res) =>{
     res.render('registration', { 'title': 'регистрация' })
}

module.exports = {indexPage, biography, auth, registration}