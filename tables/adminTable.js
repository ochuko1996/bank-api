const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')
const sql = `CREATE TABLE IF NOT EXISTS admin ( id int(100) AUTO_INCREMENT PRIMARY KEY NOT NULL, username varchar(255) NOT NULL, password varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
const adminTable = dynamicTable(sql)

module.exports= adminTable