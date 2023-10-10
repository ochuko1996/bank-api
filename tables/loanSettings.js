const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS loan_settings (id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, loan_type int(255) NOT NULL, interest int(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1`

const loanSettingsTable = dynamicTable(sql)

module.exports = loanSettingsTable