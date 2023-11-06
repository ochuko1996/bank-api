import { StatusCodes } from 'http-status-codes'
import db from '../util/db.js'

import dateTime from 'date-time'
const addTransaction = (req, res)=>{
    const memberId = req.params.memberId
    const payload = req.body
    const date_time = dateTime()
    console.log(dateTime());
    // construct sql dynamically
    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
    
    const sql = `SELECT site_app_id, api_key FROM members WHERE id = ?`
    const values = [memberId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        const data = result[0]
        // check if member exist
        if(!data) return res.status(StatusCodes.NOT_FOUND).json(`member with id: ${memberId} not found`)
        
        const sql = `INSERT INTO transaction (${fieldNames.join(', ')}, date_time, api_key, secret_key, member_id) VALUES(?)`
        const values = [...fieldValues, date_time, data.api_key, data.site_app_id, memberId]
    
        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

            res.status(StatusCodes.CREATED).json("Transaction successful")
        })
    })
}
const getTransactions = (req, res)=>{

}
const getTransaction = (req, res)=>{

}
const deleteTransaction = (req, res)=>{

}
const updateTransaction = (req, res)=>{

}

export {
    addTransaction,
    getTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
}