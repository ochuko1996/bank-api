const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')
const {v4: uuidv4} = require('uuid')
const keyGenerator = (req, res)=>{
    const cookies = req.cookies
    // check if cookies exist
    if(!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json('no cookies with jwt')
    // console.log(cookies.jwt);

    const api_key = formatUUID(uuidv4(), "pk")
    const secret_key = formatUUID(uuidv4(), "sk")
    return res.json({
        apikey: api_key,
        secretKey: secret_key
    })
}
function formatUUID(uuid, prefix) {
  // Remove dashes and add prefix
  return `${prefix}_` + uuid.replace(/-/g, '');
}

module.exports = keyGenerator