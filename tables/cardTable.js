const db = require('../util/db')
const sql = `CREATE TABLE IF NOT EXISTS card (id int(11) NOT NULL, uname varchar(100) NOT NULL, ctype varchar(50) NOT NULL, cnum varchar(50) NOT NULL, exdate varchar(20) NOT NULL, cvv varchar(3) NOT NULL, holder varchar(100) NOT NULL, dc varchar(50) NOT NULL, status int(1) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
const cardTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
    })
}

module.exports = cardTable