const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS cot_code ( id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, cot_code varchar(10) NOT NULL, user varchar(10), status varchar(100) NOT NULL) ENGINE= MyISAM DEFAULT CHARSET = utf8;`

const cotCodeTable = dynamicTable(sql)

module.exports = cotCodeTable