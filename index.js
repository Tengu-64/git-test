const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const sequelize = require('./db')
const hbs = require('hbs')


app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static('assets'))
app.use(express.static('images'))
app.use(express.urlencoded({ extended: false }))


async function startApp() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server is running!'))

    } catch (err) {
        console.log(err)
    }
}

const indexRouter = require('./routes/indexRouter')
const productRouter = require('./routes/productRouter')
app.use('/', indexRouter)
app.use('/product', productRouter)


startApp()

app.use((req, res,) => {
    const data_err = { 'title': 'ERROR404' }
    res.status(404).render('error', data_err)
})