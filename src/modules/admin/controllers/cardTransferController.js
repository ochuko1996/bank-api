import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import { StatusCodes } from "http-status-codes";

const addCardTransfer = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const payload = req.body;

        const cardTransferProp = new DynamicSql(payload);

        // Find API key for the given site app
        const findApiKeySql = 'SELECT api_key FROM site_app WHERE id = ?';
        const findApiKeyValues = [siteAppId];
        const [apiKeyResult] = await db.query(findApiKeySql, findApiKeyValues);

        if (!apiKeyResult[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with ID: ${siteAppId} not found`);
        }

        // Insert card transfer record
        const insertCardTransferSql = `INSERT INTO cardtransfer (${cardTransferProp.fieldNames().join(', ')}, member_id, site_app_id, api_key) VALUES(?)`;
        const insertCardTransferValues = [...cardTransferProp.fieldValues(), memberId, siteAppId, apiKeyResult[0].api_key];
        const [insertResult] = await db.query(insertCardTransferSql, [insertCardTransferValues]);

        if (insertResult.affectedRows > 0) {
            return res.status(StatusCodes.CREATED).json('Card transfer successful');
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
        }
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getCardTransfers = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;

        // Find card transfers for the given site app and member
        const findCardTransfersSql = 'SELECT * FROM cardtransfer WHERE site_app_id = ? AND member_id = ?';
        const findCardTransfersValues = [siteAppId, memberId];
        const [result] = await db.query(findCardTransfersSql, findCardTransfersValues);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json('Card transfers not found');
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getCardTransfer = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const id = req.params.cardTransferId;

        // Find card transfer by ID and site app ID
        const findCardTransferSql = 'SELECT * FROM cardtransfer WHERE id = ? AND site_app_id = ?';
        const findCardTransferValues = [id, siteAppId];
        const [result] = await db.query(findCardTransferSql, findCardTransferValues);

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card transfer not found');
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const updateCardTransfer = async (req, res) => {
    try {
        const id = req.params.cardTransferId;
        const payload = req.body;

        const cardTransferProp = new DynamicSql(payload);

        // Update card transfer by ID
        const updateCardTransferSql = `UPDATE cardtransfer SET ${cardTransferProp.placeholder()} WHERE id = ?`;
        const updateCardTransferValues = [...cardTransferProp.fieldValues(), id];

        // Execute the update query
        const [result] = await db.query(updateCardTransferSql, updateCardTransferValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card transfer not found');
        }

        res.status(StatusCodes.OK).json('Card transfer updated successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const deleteCardTransfer = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const id = req.params.cardTransferId;

        // Delete card transfer by ID and site app ID
        const deleteCardTransferSql = 'DELETE FROM cardtransfer WHERE id = ? AND site_app_id = ?';
        const deleteCardTransferValues = [id, siteAppId];

        // Execute the deletion query
        const [result] = await db.query(deleteCardTransferSql, deleteCardTransferValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card transfer not found');
        }

        res.status(StatusCodes.OK).json('Card transfer deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addCardTransfer,
    getCardTransfer,
    getCardTransfers,
    updateCardTransfer,
    deleteCardTransfer
}