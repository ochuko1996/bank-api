const db = require('../util/db')

const sql = `CREATE TABLE IF NOT EXISTS users ( id int(255) AUTO_INCREMENT PRIMARY KEY NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, phone varchar(50) NOT NULL, user varchar(900) NOT NULL, pass varchar(30) NOT NULL, api_key varchar(255), secret_key varchar(255) NOT NULL) ENGINE =MyISAM DEFAULT CHARSET=latin1`

const usersTable = ()=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("users table created");
    })
}

module.exports = usersTable