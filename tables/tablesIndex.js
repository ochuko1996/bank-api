const accountTable = require('./accountTable')
const adminTable = require('./adminTable')
const billingTable = require('./biilingTable')
const billingCodeTable = require("./billingCode")
const cardTable = require('./cardTable')
const cardTransferTable = require('./cardTransfer')
const fundTable = require('./fundTable')
const siteAppTable = require('./siteApp')
const membersTable = require('./members')
const transTable = require('./trans')
const usersTable = require('./users')
const loanSettingsTable = require('./loanSettings')
const loanTable = require('./loan')
const loanTypeTable = require('./loanType')

const createTable = ()=>{
    accountTable
    adminTable
    billingTable
    billingCodeTable
    cardTable
    cardTransferTable
    fundTable
    siteAppTable
    membersTable
    transTable
    usersTable
    loanSettingsTable
    loanTable
    loanTypeTable
    console.log("tables created");
}
module.exports = createTable