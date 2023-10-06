const db = require('../util/db')
const sql = `CREATE TABLE IF NOT EXISTS admin ( id int(100) AUTO_INCREMENT PRIMARY KEY NOT NULL, username varchar(255) NOT NULL, password varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
const adminTable = ()=>{
    db.query(sql, (err, results)=> {
        if(err) console.log(err);
        // console.log("admin table created");
    })
}

module.exports= adminTable