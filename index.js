require('dotenv').config()
const express = require('express')
const app = express()

const PORT = 4000 || process.env.PORT

// const accountRoute = require('./routes/accountRoute')
const db = require('./util/db')
const createTable = require('./tables/tablesIndex')
const users = require('./routes//usersRoute')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
// app.use('/*', accountRoute)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware for cookies
app.use(cookieParser())
app.use('/cookies', (req, res)=>{

    console.log(req.cookies);
    console.log(req.signedCookies);
})
createTable()
app.use('/api', users)
// protected routes
app.use('/api', require('./routes/apiKeyRoute'))
app.use(verifyJWT)
//api key generator
app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is life on port: ${PORT}`))