const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const db = require('../util/db')

const addSiteApp = (req, res)=>{
    const {sitename, sitephone,	siteaddress, siteemail} = req.body
    const id = req.user.id
    const values = [id]
    const sql = `SELECT secret_key, api_key, secret_key_hash  FROM users WHERE id = ?`
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        const data = result[0]
        // check if api key exist on db
        const compareSecretKey = bcrypt.compare(data.secret_key, data.secret_key_hash)
        if (!compareSecretKey)  return res.status(StatusCodes.FORBIDDEN).json('secret key is incorrect or does not exist')

        const sql = `INSERT INTO site_app (sitename, sitephone, siteaddress, siteemail, api_key) VALUE(?)`
        const values = [
            sitename, 
            sitephone, 
            siteaddress, 
            siteemail,
            data.api_key
        ]
        db.query(sql, [values], (err, result)=> {
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
            
           return res.status(StatusCodes.OK).json("site app created successfully")
    
        })
    })
}

module.exports = {
    addSiteApp
}