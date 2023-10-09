const db = require('../util/db')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const {v4: uuidv4} = require('uuid')

const postApiKeyandSecretKey = (req, res)=>{
    const {api_key, secret_key} = req.body
    const id = req.user.id
    // console.log(id);
    const sql = `UPDATE users SET api_key = ?, secret_key= ? WHERE id = ?`
    const hashSecretKey = hashKeys(secret_key)
    const hashApiKey =  hashKeys(api_key)
  
    const values = [
        hashApiKey,
        hashSecretKey,
        id
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong story')
        const sql = `SELECT * FROM users WHERE id = ${id}`
        db.query(sql, (err, result)=>{
            // console.log(err);
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
            return res.status(StatusCodes.OK).json(result)
        })
    })
}

function hashKeys (key){
    const SALT = uuidv4()
    return  bcrypt.hashSync(SALT + key + process.env.PEPPER,10)
}

module.exports = {
    postApiKeyandSecretKey
}
