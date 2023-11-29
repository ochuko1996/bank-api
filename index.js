import "dotenv/config.js";
import express from "express";
import { adminApp } from "./src/modules/admin/app.js";
const app = express()
const PORT = process.env.PORT | 4000
import cookieParser from "cookie-parser";
import cors from 'cors'
import credential from './src/middleware/credentials.js'
import corsOptions from './src/config/corsOptions.js';
import { mobileApp } from "./src/modules/mobile/app.js";
// const cookieParser = require('cookie-parser')
//middleware for credentials
// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credential) 
// Cross Origin Resources Sharing (cors)
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// middleware for cookies
app.use(cookieParser())

app.use(mobileApp())
app.use(adminApp())
app.use('/', (req, res)=> {
    res.send("Bank Api")
})
app.listen(PORT, ()=> console.log(`Server is live on port: ${PORT}`))
