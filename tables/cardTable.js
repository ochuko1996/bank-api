import dynamicTable from "../util/dynamicTable.js"
const sql = `CREATE TABLE IF NOT EXISTS card (id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, member_id varchar(100) NOT NULL, ctype varchar(50) NOT NULL, cnum varchar(50) NOT NULL, exdate varchar(20) NOT NULL, cvv varchar(3) NOT NULL, holder varchar(100) NOT NULL, dc varchar(50) NOT NULL, status int(1) NOT NULL DEFAULT 0, site_app_id varchar(100) NOT NULL, api_key varchar(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
const cardTable = dynamicTable(sql)

export default cardTable