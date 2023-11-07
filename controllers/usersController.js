import db from '../util/db.js'
import { StatusCodes } from 'http-status-codes'
import DynamicSql from '../util/dynamicSql.js'
const getUsers = (req, res)=>{
    // const id = req.user.id
    const sql = `SELECT * FROM users`
    db.query(sql, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        res.status(StatusCodes.OK).json(result)
     })
}
const getUser = (req, res)=>{
    const userId = req.params.id 
    const sql = `SELECT * FROM users WHERE id = ?`
    const values = [userId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`user with id: ${userId} not found`)
        res.status(StatusCodes.OK).json(result)
    })
}
const updateUser = (req, res)=>{
     const userId = req.params.id 
     const payload = req.body

    const UserProp = new DynamicSql(payload)
    const sql = `UPDATE users SET ${UserProp.placeholder()}  WHERE id = ?`
    const values = [userId]
    db.query(sql, [...UserProp.fieldValues(), values], (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`user with id: ${userId} not found`)
        res.status(StatusCodes.OK).json(`user with id: ${userId} updated successfully`)
    })
}
const deleteUser = (req, res)=>{
     const userId = req.params.id 

    const sql = `DELETE FROM users WHERE id = ?`
    const values = [userId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`user with id: ${userId} not found`)
        res.status(StatusCodes.OK).json(`user with id: ${userId} delete successfully`)
    })
}


export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}
