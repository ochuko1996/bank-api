import db from './db.js'

const dynamicTable = (sql)=>{
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        // console.log("users table created");
    })
}

export default dynamicTable