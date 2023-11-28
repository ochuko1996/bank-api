import { StatusCodes } from "http-status-codes"
import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'

// can one billing add more than one billing code?
const addBillingCode = async (req, res)=>{
    const billingId = req.params.billingId
    const {member_id, status} = req.body
    
    
    let billingCode = ""
    try {
        const sql = `SELECT api_key, site_app_id FROM billing WHERE id = ?`
        const value = [billingId]
        // find billing by id
        const [result] = await db.query(sql, value)
        const data = result[0]
        // check if billing id exist
        if(!data) return res.status(StatusCodes.NOT_FOUND).json(`billing with ${billingId} not found`)
        
        const billingCodeSql = `INSERT INTO billing_code (billing_id, billing_code, member_id, status, site_app_id, api_key) VALUES(?)`
        const values = [billingId, randomFunc(billingCode).toUpperCase(), member_id, status, data.site_app_id, data.api_key]
        
        const [billingresult] = await db.query(billingCodeSql, [values]) 

        if (!billingresult.affectedRows === 0) {
            return res.status(StatusCodes.CREATED).json("billing code added successfully")
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('something went wrong')
    }
}
const getBillingCodes = async (req, res)=>{
    const billingId = req.params.billingId
    try {
        const sql = `SELECT * FROM billing_code WHERE billing_id = ?`
        const values = [billingId]
        const [result] = await db.query(sql, values)        
        // check if billing code id exists
        if(!result[0]) return res.status(StatusCodes.NOT_FOUND).json(`billing code with id: ${billingCodeId}`)
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
    }   
}
const getBillingCode = async (req, res) => {
    try {
        const billingId = req.params.billingId;
        const billingCodeId = req.params.billingCodeId;

        // Find billing code by billing id and code id
        const findBillingCodeSql = 'SELECT * FROM billing_code WHERE billing_id = ? AND id = ?';
        const findBillingCodeValues = [billingId, billingCodeId];
        const [result] = await db.query(findBillingCodeSql, findBillingCodeValues);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`Billing code with ID: ${billingCodeId} not found`);
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const deleteBillingCode = async (req, res) => {
    try {
        const billingId = req.params.billingId;
        const billingCodeId = req.params.billingCodeId;

        // Delete billing code by billing id and code id
        const deleteBillingCodeSql = 'DELETE FROM billing_code WHERE billing_id = ? AND id = ?';
        const deleteBillingCodeValues = [billingId, billingCodeId];

        // Execute the deletion query
        const [result] = await db.query(deleteBillingCodeSql, deleteBillingCodeValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Billing code with ID: ${billingCodeId} not found`);
        }

        res.status(StatusCodes.OK).json('Billing code deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const updateBillingCode = async (req, res) => {
    try {
        const billingId = req.params.billingId;
        const billingCodeId = req.params.billingCodeId;
        const { member_id, status } = req.body;

        // Update billing code by billing id and code id
        const updateBillingCodeSql = 'UPDATE billing_code SET member_id = ?, status = ? WHERE billing_id = ? AND id = ?';
        const updateBillingCodeValues = [member_id, status, billingId, billingCodeId];

        // Execute the update query
        const [result] = await db.query(updateBillingCodeSql, updateBillingCodeValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Billing code with ID: ${billingCodeId} not found`);
        }

        res.status(StatusCodes.OK).json(`Billing code with ID: ${billingCodeId} is updated successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const randomFunc = (billingCode)=>{
    
    // array of alpha numeric values
    const alphaNum = [...Array(26).keys()].map(i => String.fromCharCode(i + 97)).concat([...Array(10).keys()].map(i => String(i)));
    for (let i = 0; i < 10; i++){
        billingCode += alphaNum[randomNumber()]
    }
    // random number logic
    const randomNumber = ()=>{
        return Math.floor(Math.random() * alphaNum.length)
    }
    return billingCode
}

export {
    addBillingCode,
    getBillingCodes,
    getBillingCode,
    deleteBillingCode, 
    updateBillingCode
}