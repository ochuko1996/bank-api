const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')
const bcrypt = require('bcryptjs')


const registerUser = (req, res)=>{
    const {name, email, phone, user, pass} = req.body
    // console.log(req.body);
    // console.log(req);

    const sql = `SELECT * FROM users WHERE email = ?`
    
    db.query(sql,[email], (err, result)=>{
        if(err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        
        // check if user exist
        if(result.length) return res.status(StatusCodes.CONFLICT).json("user already exist")

        // create new user
        // hash password
        const hashedPwd = bcrypt.hash(pass, 10)
        const sql = `INSERT INTO users (name, email, phone, user, pass) VALUE (?)`

        const values = [
            name, 
            email,
            phone,
            user,
            hashedPwd
        ]
        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
            return res.status(StatusCodes.CREATED).json("user created")
        })
    })
}

module.exports = {
    registerUser
}
