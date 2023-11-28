import { StatusCodes } from "http-status-codes"
import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'

const addBilling = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const payload = req.body;

        const billingProp = new DynamicSql(payload);

        // Find API key for the given site app
        const findApiKeySql = 'SELECT api_key FROM site_app WHERE id = ?';
        const findApiKeyValues = [siteAppId];
        const [apiKeyResult] = await db.query(findApiKeySql, findApiKeyValues);

        if (!apiKeyResult[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with ID: ${siteAppId} not found`);
        }

        // Insert billing record
        const insertBillingSql = `INSERT INTO billing (${billingProp.fieldNames().join(', ')}, site_app_id, api_key) VALUES(?)`;
        const insertBillingValues = [...billingProp.fieldValues(), siteAppId, apiKeyResult[0].api_key];
        const [insertResult] = await db.query(insertBillingSql, [insertBillingValues]);

        if (insertResult.affectedRows > 0) {
            return res.status(StatusCodes.CREATED).json('Billing created successfully');
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
        }
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getBillings = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;

        // Find billings for the given site app
        const findBillingsSql = 'SELECT * FROM billing WHERE site_app_id = ?';
        const findBillingsValues = [siteAppId];
        const [result] = await db.query(findBillingsSql, findBillingsValues);

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getBilling = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const billingId = req.params.billingId;

        // Find billing by site app id and billing id
        const findBillingSql = 'SELECT * FROM billing WHERE site_app_id = ? AND id = ?';
        const findBillingValues = [siteAppId, billingId];
        const [result] = await db.query(findBillingSql, findBillingValues);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`No billing with ID: ${billingId}`);
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const updateBilling = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const billingId = req.params.billingId;
        const payload = req.body;

        const billingProp = new DynamicSql(payload);

        // Update billing by site app id and billing id
        const updateBillingSql = `UPDATE billing SET ${billingProp.placeholder()} WHERE site_app_id = ? AND id = ?`;
        const updateBillingValues = [...billingProp.fieldValues(), siteAppId, billingId];

        // Execute the update query
        const [result] = await db.query(updateBillingSql, updateBillingValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`No billing with ID: ${billingId}`);
        }

        res.status(StatusCodes.OK).json(`Billing with ID: ${billingId} was updated successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const deleteBilling = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const billingId = req.params.billingId;

        // Delete billing by site app id and billing id
        const deleteBillingSql = 'DELETE FROM billing WHERE site_app_id = ? AND id = ?';
        const deleteBillingValues = [siteAppId, billingId];

        // Execute the deletion query
        const [result] = await db.query(deleteBillingSql, deleteBillingValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`No billing with ID: ${billingId}`);
        }

        res.status(StatusCodes.OK).json(`Billing with ID: ${billingId} was deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addBilling,
    getBilling, 
    getBillings,
    updateBilling,
    deleteBilling
}