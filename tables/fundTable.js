const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS fund (id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, date varchar(300) NOT NULL, des varchar(700) NOT NULL, Uname varchar(100) NOT NULL, amount varchar(8000) NOT NULL, type varchar(8000) NOT NULL, num varchar(5000) NOT NULL, trxStatus varchar(1000) NOT NULL DEFAULT 'Completed', trxID varchar(1000) NOT NULL DEFAULT 'mnhg', trxName varchar(1000) NOT NULL, curBal varchar(1000) NOT NULL, api_key varchar(255) NOT NULL, secret_key varchar(255) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=latin1;`

const fundTable = dynamicTable(sql)
module.exports = fundTable