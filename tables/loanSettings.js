const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS loan_settings (id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, loan_type int(255) NOT NULL, interest int(100) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1`

const loanSettingsTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("loan setting table created");
    })
}

module.exports = loanSettingsTable