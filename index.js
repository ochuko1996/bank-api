require('dotenv').config()
const express = require('express')
const app = express()

const PORT = 4000 || process.env.PORT

// const accountRoute = require('./routes/accountRoute')
const db = require('./util/db')
const createTable = require('./tables/tablesIndex')
const users = require('./routes//usersRoute')

// app.use('/*', accountRoute)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

createTable()
app.use('/api', users)
app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is life on port: ${PORT}`))