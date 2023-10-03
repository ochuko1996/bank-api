const express = require('express')
const app = express()

const PORT = 4000 || process.env.PORT

const db = require('./util/db')

app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is life on port: ${PORT}`))