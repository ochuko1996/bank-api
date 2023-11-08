import { StatusCodes } from 'http-status-codes'
import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import dateTime from 'date-time'

const addTransaction = (req, res)=>{
    const memberId = req.params.memberId
    const payload = req.body
    const date_time = dateTime()
    // construct sql dynamically
    const TransactionProp = new DynamicSql(payload)    
    const sql = `SELECT site_app_id, api_key FROM members WHERE id = ?`
    const values = [memberId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        const data = result[0]
        // check if member exist
        if(!data) return res.status(StatusCodes.NOT_FOUND).json(`member with id: ${memberId} not found`)
        
        const sql = `INSERT INTO transaction (${TransactionProp.fieldNames().join(', ')}, date_time, api_key, secret_key, member_id) VALUES(?)`
        const values = [...TransactionProp.fieldValues(), date_time, data.api_key, data.site_app_id, memberId]
    
        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

            res.status(StatusCodes.CREATED).json("Transaction successful")
        })
    })
}
const getTransactions = (req, res)=>{
    const memberId = req.params.memberId

    const sql = `SELECT * FROM transaction WHERE member_id = ?`
    const value = [memberId]

    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        res.status(StatusCodes.OK).json(result)
    })
}
const getTransaction = (req, res)=>{
    const memberId = req.params.memberId
    const transactionId = req.params.transactionId

    const sql = `SELECT * FROM transaction WHERE member_id = ? AND id = ?`
    const value = [memberId, transactionId]

    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        if(result.length === 0 ) return res.status(StatusCodes.NOT_FOUND).json("no transaction found")
        res.status(StatusCodes.OK).json(result)
    })
}
const deleteTransaction = (req, res)=>{
    const memberId = req.params.memberId
    const transactionId = req.params.transactionId

    const sql = `DELETE FROM transaction WHERE member_id = ? AND id = ?`
    const value = [memberId, transactionId]

    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json("no transaction found")
        
        res.status(StatusCodes.OK).json("transaction delete")
    })
}
const updateTransaction = (req, res)=>{
    const memberId = req.params.memberId
    const transactionId = req.params.transactionId
    const payload = req.body
    // construct sql dynamically
    const TransactionProp = new DynamicSql(payload)
    const sql = `UPDATE transaction SET ${TransactionProp.placeholder()} WHERE member_id = ? AND id = ?`
    const values = [...TransactionProp.fieldValues(), memberId, transactionId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        if(result.affectedRows === 0 ) return res.status(StatusCodes.NOT_FOUND).json("no transaction found")
        res.status(StatusCodes.OK).json("transaction updated")
    })
}

export {
    addTransaction,
    getTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
}