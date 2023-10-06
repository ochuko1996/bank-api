const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS fund_code( id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, fund_code varchar(10) NOT NULL, user varchar(10) NOT NULL, status varchar(10) NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8;`

const fundCodeTable = ()=>{
    db.query(sql, (err, results)=>{
        if (err) console.log(err);
    })
}

module.exports = fundCodeTable