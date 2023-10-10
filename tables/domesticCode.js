const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS domestic_code (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, domestic_code varchar(10) NOT NULL, user varchar(100) NOT NULL, status varchar(10) NOT NULL) ENGINE = MyISAM DEFAULT CHARSET = utf8;`

const domesticCodeTable = dynamicTable(sql)

module.exports = domesticCodeTable