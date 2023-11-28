import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import { StatusCodes } from "http-status-codes";

const addCard = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const payload = req.body;

        const cardProp = new DynamicSql(payload);

        // Find API key for the given site app
        const findApiKeySql = 'SELECT api_key FROM site_app WHERE id = ?';
        const findApiKeyValues = [siteAppId];
        const [apiKeyResult] = await db.query(findApiKeySql, findApiKeyValues);

        if (!apiKeyResult[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with ID: ${siteAppId} not found`);
        }

        // Insert card record
        const insertCardSql = `INSERT INTO card (${cardProp.fieldNames().join(', ')}, member_id, site_app_id, api_key) VALUES(?)`;
        const insertCardValues = [...cardProp.fieldValues(), memberId, siteAppId, apiKeyResult[0].api_key];
        const [insertResult] = await db.query(insertCardSql, [insertCardValues]);

        if (insertResult.affectedRows > 0) {
            return res.status(StatusCodes.CREATED).json('Card created successfully');
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
        }
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getCards = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;

        // Find cards for the given site app
        const findCardsSql = 'SELECT * FROM card WHERE site_app_id = ?';
        const findCardsValues = [siteAppId];
        const [result] = await db.query(findCardsSql, findCardsValues);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json('Cards not found');
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getCard = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;

        // Find card by member id and site app id
        const findCardSql = 'SELECT * FROM card WHERE member_id = ? AND site_app_id = ?';
        const findCardValues = [memberId, siteAppId];
        const [result] = await db.query(findCardSql, findCardValues);

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card not found');
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const deleteCard = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;

        // Delete card by member id and site app id
        const deleteCardSql = 'DELETE FROM card WHERE member_id = ? AND site_app_id = ?';
        const deleteCardValues = [memberId, siteAppId];

        // Execute the deletion query
        const [result] = await db.query(deleteCardSql, deleteCardValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card not found');
        }

        res.status(StatusCodes.OK).json('Card deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const updateCard = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const payload = req.body;

        const cardProp = new DynamicSql(payload);

        // Update card by member id
        const updateCardSql = `UPDATE card SET ${cardProp.placeholder()} WHERE member_id = ?`;
        const updateCardValues = [...cardProp.fieldValues(), memberId];

        // Execute the update query
        const [result] = await db.query(updateCardSql, updateCardValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Card not found');
        }

        res.status(StatusCodes.OK).json('Card updated successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addCard,
    getCards,
    getCard, 
    deleteCard,
    updateCard
}