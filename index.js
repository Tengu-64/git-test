const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use((req, res, next) => {
    console.log(`localhost:${PORT}${req.path}`)
    next()
})

app.get('/', (req, res) => {
    res.send('<h1>Index</h1>')
})

app.listen(PORT, () => console.log('server is running!'))