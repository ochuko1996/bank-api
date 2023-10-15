const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

const sql = `CREATE TABLE IF NOT EXISTS trans ( id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, details varchar(90) NOT NULL, name varchar(90) NOT NULL, img varchar(90) NOT NULL) ENGINE = InnoDB DEFAULT CHARSET=latin1`

const transTable = dynamicTable(sql)

module.exports = transTable