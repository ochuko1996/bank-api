import express from 'express'
const app = express()
import auth from './routes/authRoute.js'
import mobileAppTable from './models/index.js'
export const mobileApp = ()=>{
    mobileAppTable()
    app.use('/api/member', auth)
    return app
}