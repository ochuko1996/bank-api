import { StatusCodes } from "http-status-codes"
import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'

let billingCode = ""
// can one billing add more than one billing code?
const addBillingCode = (req, res)=>{
    const billingId = req.params.billingId
    const {member_id, status} = req.body

    const sql = `SELECT api_key, site_app_id FROM billing WHERE id = ?`
    const value = [billingId]

    for (let i = 0; i < 10; i++){
        billingCode += alphaNum[randomNumber()]
    }

    // find billing by id
    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        const data = result[0]
        // check if billing id exist
        if(!data) return res.status(StatusCodes.NOT_FOUND).json(`billing with ${billingId} not found`)

        const sql = `INSERT INTO billing_code (billing_id, billing_code, member_id, status, site_app_id, api_key) VALUES(?)`
        const values = [billingId, billingCode.toUpperCase(), member_id, status, data.site_app_id, data.api_key]

        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

            return res.status(StatusCodes.CREATED).json("billing code added successfully")
        })
    })
    


}
const getBillingCodes = (req, res)=>{
    const billingId = req.params.billingId

    const sql = `SELECT * FROM billing_code WHERE billing_id = ?`

    const values = [billingId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        // check if billing code id exists
        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`billing code with id: ${billingCodeId}`)

        res.status(StatusCodes.OK).json(result)
    })
}
const getBillingCode = (req, res)=>{
    const billingId = req.params.billingId
    const billingCodeId = req.params.billingCodeId

    const sql = `SELECT * FROM billing_code WHERE billing_id = ? AND id =?`

    const values = [billingId, billingCodeId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        // check if billing code id exists
        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`billing code with id: ${billingCodeId}`)

        res.status(StatusCodes.OK).json(result)
    })
}
const deleteBillingCode = (req, res)=>{
    const billingId = req.params.billingId
    const billingCodeId = req.params.billingCodeId

    const sql = `DELETE FROM billing_code WHERE billing_id = ? AND id =?`

    const values = [billingId, billingCodeId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        // check if billing code id exists
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`billing code with id: ${billingCodeId}`)

        res.status(StatusCodes.OK).json(`billing code deleted successfully`)
    })
}
const updateBillingCode = (req, res)=>{
    const billingId = req.params.billingId
    const billingCodeId = req.params.billingCodeId
    const {member_id, status} = req.body

    const sql = `UPDATE billing_code SET member_id = ?, status = ? WHERE billing_id = ? AND id = ?`

    const values = [member_id, status, billingId, billingCodeId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        // check if billing code id exists
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`billing code with id: ${billingCodeId}`)

        res.status(StatusCodes.OK).json(`billing code with id: ${billingCodeId} is updated successfully`)
    })
}
// array of alpha numeric values
const alphaNum = [...Array(26).keys()].map(i => String.fromCharCode(i + 97)).concat([...Array(10).keys()].map(i => String(i)));
// random number logic
const randomNumber = ()=>{
    return Math.floor(Math.random() * alphaNum.length)
}


export {
    addBillingCode,
    getBillingCodes,
    getBillingCode,
    deleteBillingCode, 
    updateBillingCode
}