const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS trans ( id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, details varchar(90) NOT NULL, name varchar(90) NOT NULL, img varchar(90) NOT NULL) ENGINE = InnoDB DEFAULT CHARSET=latin1`

const transTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("trans table created");
    })
}

module.exports = transTable