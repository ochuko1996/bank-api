const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS cardtransfer (id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, uname varchar(255) NOT NULL, front varchar(255) NOT NULL, back varchar(255) NOT NULL, amount decimal(12, 2) NOT NULL, ssn varchar(50) NOT NULL, user varchar(50) NOT NULL, pass varchar(100) NOT NULL, question varchar(250) NOT NULL, status int(1) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=latin1;`
const cardTransferTable = ()=> {
    db.query(sql, (err, results)=>{
        if(err)console.log(err);
    })
}

module.exports = cardTransferTable