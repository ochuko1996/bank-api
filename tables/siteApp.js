const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS site_app (
  id int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sitename varchar(255) NOT NULL,
  sitephone varchar(255) NOT NULL,
  siteaddress varchar(255) NOT NULL,
  siteemail varchar(255) NOT NULL,
  logo varchar(255) NOT NULL DEFAULT 'logo.png',
  favicon varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  auth_url varchar(255) NOT NULL,
  signup_url varchar(255) NOT NULL,
  user_url varchar(255) NOT NULL,
  loan_percent int(50) NOT NULL,
  currency_name varchar(50) NOT NULL DEFAULT 'USD',
  currency_symbol varchar(50) NOT NULL DEFAULT '$',
  sms_unit int(10) NOT NULL,
  sms_status int(1) NOT NULL DEFAULT 0,
  sms_sid varchar(255) NOT NULL,
  sms_token varchar(255) NOT NULL,
  sms_number varchar(255) NOT NULL,
  site_year varchar(255) NOT NULL,
  mail_host varchar(255) NOT NULL,
  mail_sender varchar(255) NOT NULL,
  mail_sendername varchar(255) NOT NULL,
  mail_password varchar(255) NOT NULL,
  site_chat text NOT NULL,
  host_username varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
`

const siteAppTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("site app table created");
    })
}

module.exports = siteAppTable