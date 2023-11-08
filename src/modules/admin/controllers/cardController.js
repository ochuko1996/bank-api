import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import { StatusCodes } from "http-status-codes";

const addCard = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    const payload = req.body

    const CardProp = new DynamicSql(payload)
    const sql = `SELECT api_key FROM site_app WHERE id = ?`
    const value = [siteAppId]
    db.query(sql, value, (err, result)=> {
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

        const data = result[0]
        const sql = `INSERT INTO card (${CardProp.fieldNames().join(', ')}, member_id, site_app_id, api_key) VALUES(?)`
        const values = [...CardProp.fieldValues(), memberId, siteAppId, data.api_key]

        db.query(sql, [values], (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")

            res.status(StatusCodes.CREATED).json('card created successfully')
        })
    })
}
const getCards = (req, res)=>{
    const siteAppId = req.params.siteId

    const sql = `SELECT * FROM card WHERE site_app_id = ?`
    const value = [siteAppId]
    db.query(sql, value, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        const data = result
        if(!data) return res.status(StatusCodes.NOT_FOUND).json("cards not found")

        res.status(StatusCodes.OK).json(data)
    })
}
const getCard = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    
    const sql = `SELECT * FROM card WHERE member_id = ? AND site_app_id = ?`
    const values = [memberId, siteAppId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if (result.length === 0) return res.status(StatusCodes.NOT_FOUND).json("card not found")

       return res.status(StatusCodes.OK).json(result)

    })
}
const deleteCard = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    
    const sql = `DELETE FROM card WHERE member_id = ? AND site_app_id = ?`
    const values = [memberId, siteAppId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if (result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json("card not found")

       return res.status(StatusCodes.OK).json('card deleted successfully')

    })
}
const updateCard = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    const payload = req.body

    const CardProp = new DynamicSql(payload)
    const sql = `UPDATE card SET ${CardProp.placeholder()} WHERE member_id = ?`
    const values = [...CardProp.fieldValues(), memberId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)

        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json("card not found")
        res.status(StatusCodes.CREATED).json('card created successfully')
    })
}

export {
    addCard,
    getCards,
    getCard, 
    deleteCard,
    updateCard
}