const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS loan_type ( id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, title varchar(255) NOT NULL, description varchar(255) NOT NULL, img varchar(255) NOT NULL) ENGINE = InnoDB DEFAULT CHARSET=latin1`

const loanTypeTable = dynamicTable(sql)

module.exports = loanTypeTable