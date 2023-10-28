const db = require('../util/db')
const { dynamicTable } = require('../util/dynamicTable')

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
// const sql = `CREATE TABLE IF NOT EXISTS members (
//   id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   fullname varchar(100) NOT NULL DEFAULT 'nil',
//   username varchar(200) NOT NULL DEFAULT 'nil',
//   pincode int(4) NOT NULL DEFAULT 0,
//   dob varchar(100) NOT NULL DEFAULT '00/00/00',
//   password varchar(100) NOT NULL DEFAULT '123456',
//   email varchar(100) NOT NULL DEFAULT ' nil',
//   com varchar(100) NOT NULL DEFAULT 'nil',
//   number varchar(100) NOT NULL DEFAULT 'nil',
//   address varchar(100) NOT NULL DEFAULT 'nil',
//   country varchar(700) NOT NULL DEFAULT 'nil',
//   bank_email varchar(9000) NOT NULL DEFAULT 'nil',
//   bank_number varchar(9000) NOT NULL DEFAULT 'nil',
//   img varchar(9000) NOT NULL DEFAULT 'default.png',
//   t int(1) NOT NULL DEFAULT 1,
//   cot int(1) NOT NULL DEFAULT 0,
//   dom int(1) NOT NULL DEFAULT 0,
//   fund int(1) NOT NULL DEFAULT 0,
//   liab int(1) NOT NULL DEFAULT 0,
//   p int(50) NOT NULL DEFAULT 0,
//   otp varchar(1000) NOT NULL DEFAULT '121212',
//   login_otp varchar(10) NOT NULL DEFAULT ' 121212',
//   login varchar(9000) NOT NULL DEFAULT 'nil',
//   code varchar(255) NOT NULL DEFAULT 'nil',
//   msg varchar(255) NOT NULL DEFAULT 'nil',
//   loading varchar(255) NOT NULL DEFAULT 'nil',
//   account_status_msg varchar(255) NOT NULL DEFAULT '',
//   q varchar(1000) NOT NULL DEFAULT 'nil',
//   a varchar(1000) NOT NULL DEFAULT 'nil',
//   routing varchar(100) NOT NULL DEFAULT 'nil',
//   ip varchar(50) NOT NULL DEFAULT '000.000.0.0',
//   open int(1) NOT NULL DEFAULT 1,
//   account_status int(1) NOT NULL DEFAULT 1,
//   kyc int(1) NOT NULL DEFAULT 0, site_app_id varchar(100) NOT NULL, api_key varchar(100) NOT NULL
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
// `

const membersTable = dynamicTable(sql)
module.exports = membersTable