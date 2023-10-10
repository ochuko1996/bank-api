const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS liability_code (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, liability_code varchar(10) NOT NULL, user varchar(10) NOT NULL, status varchar(10) NOT NULL)`

const liabilityCodeTable = dynamicTable(sql)

module.exports = liabilityCodeTable