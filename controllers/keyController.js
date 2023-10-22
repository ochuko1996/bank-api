const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const keyGenerator = (req, res)=>{
    const id = req.user.id

    const cookies = req.cookies
    // check if cookies exist
    if(!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json('no cookies with jwt')
    
    
    const values = [id]
    db.query(`SELECT * FROM users WHERE id = ?`, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        const userData = result[0]
        // check if keys already exists on DB
        if(userData.api_key === null || "" && userData.secret_key === null || "" && userData.hashSecretKey === null || ""){
            // update users with keys
            const sql = `UPDATE users SET api_key = ?, secret_key= ?, secret_key_hash = ? WHERE id = ?`
            // generate keys
            const api_key = formatUUID(uuidv4(), "pk")
            const secret_key = formatUUID(uuidv4(), "sk")
            // hash secret key
            const hashSecretKey = hashKeys(secret_key)
            const values = [
                api_key,
                secret_key,
                hashSecretKey,
                id
            ]
            db.query(sql, values, (err, result)=>{
                if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
                return res.status(StatusCodes.OK).json("generated api successfully")
            })
        } else {
            return res.status(StatusCodes.CONFLICT).json("Keys already exist")
        }
        
        
    })
}
// util hash func
function hashKeys (key){
    const SALT = uuidv4()
    return  bcrypt.hashSync(SALT + key + process.env.PEPPER, 10)
}
function formatUUID(uuid, prefix) {
  // Remove dashes and add prefix
  return `${prefix}_` + uuid.replace(/-/g, '');
}

module.exports = keyGenerator