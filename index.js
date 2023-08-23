const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('images'))


app.use((req, res, next) => {
    console.log(`localhost:${PORT}${req.path}`)
    next()
})


app.get('/', (req, res) => {
    const data_home = { 'title': 'манга Дзюндзи Ито' }
    res.render('index', data_home)
})

app.get('/biography', (req, res) => {
    const data_biography = {'title': 'биография дзюндзи ито'}
    res.render('biography', data_biography)
})

app.listen(PORT, () => console.log('server is running!'))


app.use((req, res,) => {
    const data_err = { 'title': 'ERROR404' }
    res.status(404).render('error', data_err)
})
