import accountTable from './accountTable.js';
import adminTable from './adminTable.js';
import billingTable from './billingTable.js';  
import billingCodeTable from './billingCode.js';
import cardTable from './cardTable.js';
import cardTransferTable from './cardTransfer.js';
import transactionTable from './transactionTable.js';
import siteAppTable from './siteApp.js';
import membersTable from './members.js';
import usersTable from './users.js';


const createTable = ()=>{
    accountTable
    adminTable
    billingTable
    billingCodeTable
    cardTable
    cardTransferTable
    transactionTable
    siteAppTable
    membersTable
    usersTable
    console.log("tables created");
}
export default createTable