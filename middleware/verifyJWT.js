const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next)=> {
    const authHeader = req.headers.authorization || req.headers.Authorization

    // check if token exists in header
    if(!authHeader) return res.status(StatusCodes.UNAUTHORIZED)
    
    const token = authHeader.split(" ")[1]

    jwt.verify(
        token, 
        process.env.JWT_SECRET_KEY, 
        (err, decoded)=>{
            console.log(err);
            if(err) return res.status(StatusCodes.FORBIDDEN)
            req.user = decoded.user
            next()
        }
    )
}

module.exports = verifyJWT