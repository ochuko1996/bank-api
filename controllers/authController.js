const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser =  (req, res)=>{
    const {name, email, phone, user, pass} = req.body

    const sql = `SELECT * FROM users WHERE email = ?`
    
    db.query(sql,[email], (err, result)=>{
        if(err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        
        // check if user exist
        if(result.length) return res.status(StatusCodes.CONFLICT).json("user already exist")

        // create new user
        // hash password
        const hashedPwd = bcrypt.hashSync(pass, 10)
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

const login =  (req, res)=>{

    const sql = `SELECT * FROM users WHERE email = ?`

    db.query(sql, [req.body.email], (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("someting went wrong")
        if(result.length === 0) return res.status(StatusCodes.NOT_FOUND).json("user not found")

        const data = result[0]
        const checkPassword =  bcrypt.compare(req.body.pass, data.pass)
        if(!checkPassword) return res.status(StatusCodes.BAD_REQUEST).json("Wrong password or email")

        const token = jwt.sign(serializedUser(data), process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
        res.cookie('jwt', token, {
            httponly: true, 
            sameSite: 'none', 
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true //when going online or using in chrome uncomment this line
        })
        return res.status(StatusCodes.ACCEPTED).json({token, user: serializedUser(data)})
           
    })
}
const logout = (req, res)=> {
    res.clearCookie('jwt', {
        httponly: true, 
        sameSite: 'none', 
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true //when going online or using in chrome uncomment this line
    }).status(StatusCodes.OK).json("user has been logged out")
}

function serializedUser(user){
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}
module.exports = {
    registerUser,
    login,
    logout
}
