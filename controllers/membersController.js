const db = require('../util/db')
const {StatusCodes} = require('http-status-codes')

const addMember = (req, res)=>{
    const payload = req.body
    const siteAppId = req.params.siteId

    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
    
    const sql = `SELECT api_key FROM site_app WHERE id = ?`
    const values = [siteAppId]
    // get api key from site app
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        
        const data = result[0]
        if(!data) return res.status(StatusCodes.BAD_REQUEST).json(`no site with id: ${siteAppId}`)

        // check for existing member
        const sql = `SELECT * FROM members WHERE email = ?`
        const values = [payload.email]
        db.query(sql, values, (err, result)=>{
            if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
            
            if(result[0]) return res.status(StatusCodes.CONFLICT).json('member already exist')
            const sql = `INSERT INTO members (${fieldNames.join(', ')}, site_app_id, api_key) VALUES (?)`
            const values = [
                ...fieldValues, 
                siteAppId, 
                data.api_key
            ]
            // add new members
            db.query(sql, [values], (err, result)=>{
                console.log();
                if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    
                return res.status(StatusCodes.CREATED).json('member created successfully')
            })
        })
    })
}
const getMembers = (req, res)=> {
    const siteAppId = req.params.siteId
    const sql = `SELECT * FROM members WHERE site_app_id = ?`
    const values = [siteAppId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        const data = result
        if(data.length === 0) return res.status(StatusCodes.NOT_FOUND).json('no members found') 

        res.status(StatusCodes.OK).json(data)
    })
}
const getMember = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId

    const sql = `SELECT * FROM members WHERE site_app_id = ? AND id = ?`
    const values = [siteAppId, memberId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
        console.log(result[0]);
        // check if member exist
        if(result.length === 0) return res.status(StatusCodes.NOT_FOUND).json(`no member with id: ${memberId} `)
        res.status(StatusCodes.OK).json(result)
    })
}
const deleteMember = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId

    const sql = `DELETE FROM members WHERE site_app_id = ? AND id = ?`
    const values = [siteAppId, memberId]
    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        // check if member exist
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`no member with id: ${memberId} `)

        res.status(StatusCodes.OK).json(`member with id: ${memberId} has been deleted successfully`)
    })

}
const updateMember = (req, res)=>{
    const siteAppId = req.params.siteId
    const memberId = req.params.memberId
    const payload = req.body

    // construct the SQL dynamically
    const fieldNames = Object.keys(payload)
    const fieldValues = fieldNames.map(fieldName => payload[fieldName])
    const placeholder = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')

    const sql = `UPDATE members SET ${placeholder} WHERE site_app_id = ? AND id = ?`
    const values = [...fieldValues, siteAppId, memberId]

    db.query(sql, values, (err, result)=>{
        if(err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')

        // check if member was not updated
        if(result.affectedRows === 0) return res.status(StatusCodes.NOT_FOUND).json(`no member with id: ${memberId} `)

        res.status(StatusCodes.OK).json("member details updated successfully")
    })
}

module.exports = {
    addMember,
    getMembers,
    getMember, 
    deleteMember,
    updateMember
}