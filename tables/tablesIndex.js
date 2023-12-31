const accountTable = require('./accountTable')
const adminTable = require('./adminTable')
const billingTable = require('./biilingTable')
const cardTable = require('./cardTable')
const cardTransferTable = require('./cardTransfer')
const cotCodeTable = require('./cotCode')
const domesticCodeTable = require('./domesticCode')
const fundTable = require('./fundTable')
const fundCodeTable = require('./fundCode')
const siteAppTable = require('./siteApp')
const membersTable = require('./members')
const transTable = require('./trans')
const liabilityCodeTable = require('./liabilityCode')
const usersTable = require('./users')
const loanSettingsTable = require('./loanSettings')
const loanTable = require('./loan')

const createTable = ()=>{
    accountTable()
    adminTable()
    billingTable()
    cardTable()
    cardTransferTable()
    cotCodeTable()
    domesticCodeTable()
    fundTable()
    fundCodeTable()
    siteAppTable()
    membersTable()
    transTable()
    liabilityCodeTable()
    usersTable()
    loanSettingsTable()
    loanTable()
    console.log("tables created");
}
module.exports = createTable