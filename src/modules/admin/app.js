import express from "express";

import keyRoute from './routes/keyRoute.js'
import createTable from "./models/tablesIndex.js";
import auth from './routes/authRoute.js'
// import verifyJWT from './middleware/verifyJWT.js'

import users from './routes/usersRoute.js';
import site_app from './routes/siteAppRoute.js';
import members from './routes/membersRoute.js';
import account from './routes/accountRoute.js';
import billing from './routes/billingRoute.js';
import billingCode from './routes/billingCodeRoute.js';
import transaction from './routes/transactionRoute.js';
import card from './routes/cardRoute.js'
import cardTransfer from './routes/cardTransferRoute.js'

export const adminApp = ()=>{
    const app = express()

    createTable()
    app.use('/api', auth)
    
    app.use('/api', keyRoute)
    app.use('/api/users', users)
    app.use('/api/site_app', site_app)
    app.use('/api/members', members)
    app.use('/api/account', account)
    app.use('/api/billing', billing)
    app.use('/api/billing_code', billingCode)
    app.use('/api/transaction', transaction)
    app.use('/api/card', card)
    app.use('/api/card_transfer', cardTransfer)

    
    return app
}
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
    // Billing Code Routes
    // http://localhost:4000/api/billingId/ -- POST and GET
    // http://localhost:4000/api/billingId/:billingCodeId -- PUT DELETE and GET
    // Transaction Routes
    // http://localhost:4000/api/transaction/memberId/ -- POST and GET
    // http://localhost:4000/api/transaction/memberId/:transactionId -- PUT DELETE and GET
    // Card Routes
    // http://localhost:4000/api/card/:siteId/ -- GET all with siteId
    // http://localhost:4000/api/card/:siteId/:memberId -- POST
    // http://localhost:4000/api/card/:siteId/:memberId -- PUT DELETE and GET
    // Card Transfer Routes
    // http://localhost:4000/api/card_transfer/:siteId/:memberId -- POST
    // http://localhost:4000/api/card_transfer/:siteId/:memberId -- GET 
    // http://localhost:4000/api/card_transfer/:siteId/:cardTransferId -- PUT DELETE and GET