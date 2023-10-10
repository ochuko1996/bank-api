const db = require('./db')

const dynamicTable = (sql)=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("users table created");
    })
}

module.exports ={ dynamicTable}