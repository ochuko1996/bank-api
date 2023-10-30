const { StatusCodes } = require('http-status-codes')
const db = require('../util/db')

const addBilling = (req, res)=>{
    const siteAppId = req.params.siteId
    const payload = req.body
    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])

    const sql = `SELECT api_key FROM site_app WHERE id = ?`
    const values = [siteAppId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        // check if site app exist 
        if (!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`site app with ${siteAppId} not found`)

        const sql = `INSERT INTO billing (${fieldNames.join(', ')}, site_app_id, api_key) VALUES(?)`
        const values = [...fieldValues, siteAppId, result[0].api_key]
        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
            console.log(values);

            res.status(StatusCodes.CREATED).json("bill created successfully")
        })
    })
}

const getBillings = (req, res)=>{
    const siteAppId = req.params.siteId
    const sql = `SELECT * FROM billing WHERE site_app_id = ?`
    const values = [siteAppId]


    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        res.status(StatusCodes.OK).json(result)
    })
}
const getBilling = (req, res)=>{
    const siteAppId = req.params.siteId
    const billingId = req.params.billingId

    const sql = `SELECT * FROM billing WHERE site_app_id = ? AND id = ?`
    const values = [siteAppId, billingId]


    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        // check if billings exist
        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`no billing with id: ${billingId}`)
        res.status(StatusCodes.OK).json(result)
    })
}
const updateBilling = (req, res)=>{
    const siteAppId = req.params.siteId
    const billingId = req.params.billingId
    const payload = req.body

    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
    

    const sql = `UPDATE billing SET ${placeholder} WHERE site_app_id = ? AND id = ?`
    const values = [...fieldValues, siteAppId, billingId]


    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        // check if billings exist
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`no billing with id: ${billingId}`)
        res.status(StatusCodes.OK).json(`billing with id: ${billingId} was updated successfully`)
    })
}
const deleteBilling = (req, res)=>{
    const siteAppId = req.params.siteId
    const billingId = req.params.billingId

    const sql = `DELETE FROM billing WHERE site_app_id = ? AND id = ?`
    const values = [siteAppId, billingId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        // check if billings exist
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`no billing with id: ${billingId}`)
        res.status(StatusCodes.OK).json(`billing with id: ${billingId} was deleted successfully`)
    })
}

module.exports = {
    addBilling,
    getBilling, 
    getBillings,
    updateBilling,
    deleteBilling
}