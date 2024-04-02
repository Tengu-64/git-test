const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const sequelize = require('./db')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static('assets'))
app.use(express.static('images'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SECRET_KEY))

async function startApp() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server is running!'))

    } catch (err) {
        console.log(err)
    }
}

startApp()

const indexRouter = require('./routes/indexRouter')
const productRouter = require('./routes/productRouter')
const adminRouter = require('./routes/adminRouter')
app.use('/', indexRouter)
app.use('/product', productRouter)
app.use('/admin', adminRouter)



app.use((req, res,) => {
    const data_err = { 'title': 'ERROR404' }
    res.status(404).render('error', data_err)
})