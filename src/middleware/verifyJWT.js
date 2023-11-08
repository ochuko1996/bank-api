import { StatusCodes } from "http-status-codes"
import jwt from 'jsonwebtoken'
const verifyJWT = (req, res, next)=> {
    const authHeader = req.headers.authorization || req.headers.Authorization

    // check if token exists in header
    if(!authHeader) return res.status(StatusCodes.UNAUTHORIZED)
    
    const token = authHeader.split(" ")[1]

    jwt.verify(
        token, 
        process.env.JWT_SECRET_KEY, 
        (err, decoded)=>{
            if(err) return res.status(StatusCodes.FORBIDDEN)
            req.user = decoded
            // console.log(req.user);
            next()
        }
    )
}

export default verifyJWT