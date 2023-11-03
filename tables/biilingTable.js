const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')
const sql = `CREATE TABLE IF NOT EXISTS billing ( id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, code varchar(50) NOT NULL, msg varchar(1000) NOT NULL, loading varchar(100) NOT NULL, number varchar(100) NOT NULL) ENGINE=MYISAM DEFAULT CHARSET=latin1;`
const billingTable = dynamicTable(sql)
module.exports = billingTable