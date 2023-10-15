require('dotenv').config()
const express = require('express')
const app = express()

const PORT = 4000 || process.env.PORT

const cookieParser = require('cookie-parser')
const cors = require('cors')

// const accountRoute = require('./routes/accountRoute')
const db = require('./util/db')
const createTable = require('./tables/tablesIndex')
const auth = require('./routes/authRoute')
const verifyJWT = require('./middleware/verifyJWT')
const corsOptions = require('./config/corsOptions')
const users = require('./routes/usersRoute')

//middleware for credentials
// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(require('./middleware/credentials')) 
// Cross Origin Resources Sharing (cors)
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware for cookies
app.use(cookieParser())

createTable()
app.use('/api', auth)
//api key generator
app.use('/api', require('./routes/keyRoute'))
// protected routes
app.use(verifyJWT)
app.use('/api', users)
app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is life on port: http://localhost:${PORT}`))

// API End Point 
// users routes
// http://localhost:4000/api/create-user
// http://localhost:4000/api/login
// http://localhost:4000/api/logout
// API key generator route
// http://localhost:4000/api/api_key