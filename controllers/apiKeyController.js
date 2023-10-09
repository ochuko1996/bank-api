const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')
const {v4: uuidv4} = require('uuid')
const apiKeyGenerator = (req, res)=>{
    const cookies = req.cookies
    // check if cookies exist
    if(!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json('no cookies with jwt')
    console.log(cookies.jwt);

    const api_key = uuidv4()
    console.log(api_key);
    return res.json(api_key)
}

module.exports = apiKeyGenerator