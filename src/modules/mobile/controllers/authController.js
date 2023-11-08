import db from "../../../../util/db.js";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

const register = (req, res) =>{}
const login =   (req, res)=>{
    const {email, password} = req.body
    
    const sql = `SELECT * FROM members WHERE email = ?`
    db.query(sql, [email], (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        if(result.length === 0) return res.status(StatusCodes.NOT_FOUND).json("member not found")

        const data = result[0]
        
        const checkPassword = password === data.password

        if(!checkPassword) return res.status(StatusCodes.BAD_REQUEST).json("Wrong password or email")

        const token = jwt.sign(serializedUser(data), process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
        res.cookie('jwt', token, {
            httponly: true, 
            sameSite: 'none', 
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true //when going online or using in chrome uncomment this line
        })
        return res.status(StatusCodes.ACCEPTED).json({
            token, 
            user: serializedUser(data),
        })
           
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
        name: user.fullname
    }
}

export {
    login,
    register,
    logout
}