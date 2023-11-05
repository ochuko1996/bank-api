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
const site_app = require('./routes/siteAppRoute')
const members = require('./routes/membersRoute')
const account = require('./routes/accountRoute')
const billing = require('./routes/billingRoute')
const billingCode = require('./routes/billingCodeRoute')
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
// protected routes
app.use(verifyJWT)
//api key generator
app.use('/api', require('./routes/keyRoute'))
app.use('/api/users', users)
app.use('/api/site_app', site_app)
app.use('/api/members', members)
app.use('/api/account', account)
app.use('/api/billing', billing)
app.use('/api/billing_code', billingCode)
app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is life on port: http://localhost:${PORT}`))

// API End Point 
// Auth Routes
// http://localhost:4000/api/create-user --- POST
// http://localhost:4000/api/login --- POST
// http://localhost:4000/api/logout -- POST
// API key generator route
// http://localhost:4000/api/api_key
// Users Routes
// http://localhost:4000/api/users --- GET
// http://localhost:4000/api/users/:id --- GET PUT AND DELETE
// Site App Routes
// http://localhost:4000/api/site_app -- GET and POST
// http://localhost:4000/api/site_app/:id -- DELETE PUT and GET 
// Members Routes
// http://localhost:4000/api/members/:siteId -- POST and GET
// http://localhost:4000/api/members/:siteId/:memberId -- PUT, DELETE and GET
// Account Routes
// http://localhost:4000/api/account/ -- GET
// http://localhost:4000/api/account/:memberId -- POST
// http://localhost:4000/api/account/:memberId/:accountId -- PUT, DELETE and GET
// Billing Routes
// http://localhost:4000/api/billing/:siteId -- POST and GET
// http://localhost:4000/api/members/:siteId/:memberId -- PUT, DELETE and GET