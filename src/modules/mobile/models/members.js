import dynamicTable from '../../../../util/dynamicTable.js'

const sql = `CREATE TABLE IF NOT EXISTS members (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fullname varchar(100) NOT NULL DEFAULT 'nil',
  username varchar(200) NOT NULL DEFAULT 'nil',
  pincode int(4) NOT NULL DEFAULT 0,
  dob varchar(100) NOT NULL DEFAULT '00/00/00',
  password varchar(100) NOT NULL DEFAULT '123456',
  email varchar(100) NOT NULL DEFAULT ' nil',
  com varchar(100) NOT NULL DEFAULT 'nil',
  number varchar(100) NOT NULL DEFAULT 'nil',
  address varchar(100) NOT NULL DEFAULT 'nil',
  country varchar(700) NOT NULL DEFAULT 'nil',
 site_app_id varchar(100) NOT NULL, api_key varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
`

const membersTable = dynamicTable(sql)
export default membersTable