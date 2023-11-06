import db from "../util/db.js"
import { StatusCodes } from "http-status-codes"
const addAccount = (req, res)=>{
    const payload = req.body
    const memberId = req.params.memberId

    // construct a dynamic sql
    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const  sql = `SELECT * FROM members WHERE id = ?`
    const values = [memberId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        // check if member exist
        const memberData = result[0]
        if (!memberData) return res.status(StatusCodes.NOT_FOUND).json('member not found')

        // check if account already exist 
        const sql = `SELECT * FROM account WHERE memberId = ?`
        const values = [ memberId ]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong account")

            if(result[0]) return res.status(StatusCodes.CONFLICT).json('account already exist')
            const sql = `INSERT INTO account (${fieldNames.join(', ')}, memberId, username) VALUES(?)`
            const values = [...fieldValues, memberId, memberData.username]
            db.query(sql, [values], (err, result)=>{
                if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

                res.status(StatusCodes.CREATED).json('account created successfully')
            })
        })
    })
    
}

const getAccount = (req, res)=>{
    const memberId = req.params.memberId
    const accountId = req.params.accountId

    const sql = `SELECT * FROM account WHERE memberId = ? AND id = ?`
    const values = [memberId, accountId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`account with ID: ${accountId} not found`)

        res.status(StatusCodes.OK).json(result)
    })
}
const updateAccount = (req, res)=>{
    const memberId = req.params.memberId
    const accountId = req.params.accountId
    const payload =  req.body

    // construct dynamic sql 
    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')

    const sql = `UPDATE account SET ${placeholder} WHERE memberId = ? AND id = ?`
    const values = [...fieldValues, memberId, accountId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`account with ID: ${accountId} not found`)

        res.status(StatusCodes.OK).json("account updated successfully")
    })
}
const deletetAccount = (req, res)=>{
    const memberId = req.params.memberId
    const accountId = req.params.accountId

    const sql = `DELETE FROM account WHERE memberId = ? AND id = ?`
    const values = [memberId, accountId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`account with ID: ${accountId} not found`)

        res.status(StatusCodes.OK).json(`account with id: ${accountId} has been deleted successfully`)
    })
}
const getAccounts = (req, res)=>{
    

    const sql = `SELECT * FROM account`

    db.query(sql, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`account not found`)

        res.status(StatusCodes.OK).json(result)
    })
}

export {
    addAccount,
    getAccount,
    updateAccount, 
    deletetAccount,
    getAccounts
}