import dynamicTable from '../../../../util/dynamicTable.js'

const sql = `CREATE TABLE IF NOT EXISTS cardtransfer (id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, member_id varchar(255) NOT NULL, front varchar(255) NOT NULL, back varchar(255) NOT NULL, amount decimal(12, 2) NOT NULL, ssn varchar(50) NOT NULL, user varchar(50) NOT NULL, pass varchar(100) NOT NULL, question varchar(250) NOT NULL, answer varchar(250) NOT NULL, status int(1) NOT NULL DEFAULT 0, site_app_id varchar(100) NOT NULL, api_key varchar(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;`

const cardTransferTable = dynamicTable(sql)

export default cardTransferTable