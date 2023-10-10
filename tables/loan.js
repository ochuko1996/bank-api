const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS loan ( id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, user varchar(255) NOT NULL, type varchar(50) NOT NULL, amount decimal(10,2) NOT NULL, percent varchar(10) NOT NULL, totalreturn varchar(255) NOT NULL, interest varchar(100) NOT NULL, loanpayment varchar(255) NOT NULL, totalinterest varchar(255) NOT NULL, monthlypayment varchar(255) NOT NULL, status varchar(255) NOT NULL, month varchar(50) NOT NULL,  date varchar(100) NOT NULL) ENGINE= InnoDB DEFAULT CHARSET=latin1;`

const loanTable = dynamicTable(sql)

module.exports = loanTable