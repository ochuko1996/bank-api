import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import db from '../util/db.js'

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
const getAllSiteApp = (req, res)=>{
    const id = req.user.id
    const sql = `SELECT * FROM users WHERE id = ?`
    const values = [id]
    db.query(sql, values, (err, result)=>{
        const userData = result[0]
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        // check if user exists
        if(userData.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json('user not found')
    
        // find all site app
        const sql = `SELECT * FROM site_app WHERE api_key = ?`
        const values = [userData.api_key]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

            return res.status(StatusCodes.OK).json(result)
        })
    })
}
const getSiteApp = (req, res)=>{
    const id = req.user.id
    const siteAppId = req.params.id
    const sql = `SELECT * FROM users WHERE id = ?`
    const values = [id]
    db.query(sql, values, (err, result)=>{
        const userData = result[0]
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        // check if user exists
        if(userData.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json('user not found')
    
        // find single site app
        const sql = `SELECT * FROM site_app WHERE api_key = ? AND id = ?`
        const values = [userData.api_key, siteAppId]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
            // check if site app exist
            if(result.length === 0) return res.status(StatusCodes.NOT_FOUND).json(`site app with id: ${siteAppId} not found `)

            return res.status(StatusCodes.OK).json(result)
        })
    })
}
const updateSiteApp = (req, res)=>{
    const id = req.user.id
    const siteAppId = req.params.id
    const sql = `SELECT * FROM users WHERE id = ?`
    const updateData = req.body
    const values = [id]
    db.query(sql, values, (err, result)=>{
        const userData = result[0]
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        // check if user exists
        if(userData.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json('user not found')
    
        // construct the SQL dynamically
        const fieldNames = Object.keys(updateData)
        const updatedValues = fieldNames.map(fieldName => updateData[fieldName])
        const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
        // update site app
        const sql = `UPDATE site_app SET ${placeholder} WHERE api_key = ? AND id = ?`
        const values = [...updatedValues, userData.api_key, siteAppId]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
            // check if site app exist
            if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`site app with id: ${siteAppId} not found `)

            return res.status(StatusCodes.OK).json(result)
        })
    })
}
const deleteSiteApp = (req, res)=>{
    const id = req.user.id
    const siteAppId = req.params.id

    const sql = `SELECT * FROM users WHERE id = ?`
    const values = [id]
    db.query(sql, values, (err, result)=>{
        const userData = result[0]
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        // check if user exists
        if(userData.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json('user not found')
    
        const sql = `DELETE FROM site_app WHERE id = ? AND api_key = ?`
        const values = [siteAppId, userData.api_key]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
             // check if site app exist
            if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`site app with id: ${siteAppId} not found `)
            return res.status(StatusCodes.OK).json("site app successfully deleted")
        })
    })
}

export {
    addSiteApp,
    deleteSiteApp,
    getAllSiteApp,
    getSiteApp,
    updateSiteApp
}