const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS loan_type (int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, title varchar(255) NOT NULL, description varchar(255) NOT NULL, img varchar(255) NOT NULL) ENGINE = InnoDB DEFAULT CHARSET=latin1`

const loanTypeTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("loan type table created");
    })
}

module.exports = loanTypeTable