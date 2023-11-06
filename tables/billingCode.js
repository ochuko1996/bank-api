import dynamicTable from '../util/dynamicTable.js'
const sql = `CREATE TABLE IF NOT EXISTS billing_code ( id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, billing_id int(255) NOT NULL, billing_code varchar(10) NOT NULL, member_id varchar(250) NOT NULL, status varchar(20) NOT NULL, site_app_id int(100) NOT NULL, api_key varchar(255) NOT NULL) ENGINE=MYISAM DEFAULT CHARSET=latin1;`
const billingCodeTable = dynamicTable(sql)

export default billingCodeTable