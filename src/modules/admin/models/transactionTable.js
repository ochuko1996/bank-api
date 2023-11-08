import dynamicTable from '../../../../util/dynamicTable.js'

const sql = `CREATE TABLE IF NOT EXISTS transaction (id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, date_time varchar(300) NOT NULL, description varchar(700) NOT NULL, member_id varchar(100) NOT NULL, amount varchar(8000) NOT NULL, type varchar(8000) NOT NULL, receipt_acct_num varchar(10) NOT NULL, trxStatus varchar(1000) NOT NULL DEFAULT 'Completed', receipt_name varchar(1000) NOT NULL, current_bal varchar(1000) NOT NULL, api_key varchar(255) NOT NULL, secret_key varchar(255) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=latin1;`

const fundTable = dynamicTable(sql)
export default fundTable