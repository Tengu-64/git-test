const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(express.static('images'))
app.use(express.urlencoded({ extended: false }))


const indexRouter = require('./routes/index')
app.use('/', indexRouter)



app.listen(PORT, () => console.log('server is running!'))

app.use((req, res,) => {
    const data_err = { 'title': 'ERROR404' }
    res.status(404).render('error', data_err)
})
