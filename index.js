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
    res.render('index')
})

app.listen(PORT, () => console.log('server is running!'))