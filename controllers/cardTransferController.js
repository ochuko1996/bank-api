import db from "../util/db.js";
import { StatusCodes } from "http-status-codes";
import DynamicSql from "../util/dynamicSql.js";

const addCardTransfer = (req,res)=>{
     const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    const payload = req.body

    const CardTransferProp = new DynamicSql(payload)
    const sql = `SELECT api_key FROM site_app WHERE id = ?`
    const value = [siteAppId]
    db.query(sql, value, (err, result)=> {
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        const data = result[0]
        const sql = `INSERT INTO cardtransfer (${CardTransferProp.fieldNames().join(', ')}, member_id, site_app_id, api_key) VALUES(?)`
        const values = [...CardTransferProp.fieldValues(), memberId, siteAppId, data.api_key]

        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

            res.status(StatusCodes.CREATED).json('card transfer successful')
        })
    })
}
const getCardTransfers = (req,res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId

    const sql = `SELECT * FROM cardtransfer WHERE site_app_id = ? AND member_id = ?`
    const value = [siteAppId, memberId]
    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
        const data = result
        if(!data) return res.status(StatusCodes.NOT_FOUND).json("card transfer not found")

        res.status(StatusCodes.OK).json(data)
    })
}
const getCardTransfer = (req,res)=>{
    const siteAppId = req.params.siteId
    const id = req.params.cardTransferId
    
    const sql = `SELECT * FROM cardtransfer WHERE id = ? AND site_app_id = ?`
    const values = [id, siteAppId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if (result.length === 0) return res.status(StatusCodes.NOT_FOUND).json("card transfer not found")

       return res.status(StatusCodes.OK).json(result)

    })
}
const updateCardTransfer = (req,res)=>{
    const id = req.params.cardTransferId
    const payload = req.body

    const CardTransferProp = new DynamicSql(payload)
    const sql = `UPDATE cardtransfer SET ${CardTransferProp.placeholder()} WHERE member_id = ?`
    const values = [...CardTransferProp.fieldValues(), id]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json("card transfer not found")
        res.status(StatusCodes.CREATED).json('card transfer successful')
    })
}
const deleteCardTransfer = (req,res)=>{
    const siteAppId = req.params.siteId
    const id = req.params.cardTransferId
    
    const sql = `DELETE FROM cardtransfer WHERE id = ? AND site_app_id = ?`
    const values = [id, siteAppId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if (result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json("card not found")

       return res.status(StatusCodes.OK).json('card transfer deleted successfully')

    })
}

export {
    addCardTransfer,
    getCardTransfer,
    getCardTransfers,
    updateCardTransfer,
    deleteCardTransfer
}