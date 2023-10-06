const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS liability_code (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, liability_code varchar(10) NOT NULL, user varchar(10) NOT NULL, status varchar(10) NOT NULL)`

const liabilityCodeTable = ()=>{
    db.query(sql, (err, results)=>{
        if(err) console.log(err);
        // console.log("liability code table created");
    })
}

module.exports = liabilityCodeTable