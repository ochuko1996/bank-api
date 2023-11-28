import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import { StatusCodes } from "http-status-codes"

const addAccount = async (req, res) => {
    try {
        const payload = req.body;
        const memberId = req.params.memberId;

        // Check if the member exists
        const checkMemberSql = 'SELECT * FROM members WHERE id = ?';
        const [memberResult] = await db.query(checkMemberSql, [memberId]);

        if (memberResult.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('Member not found');
        }

        const memberData = memberResult[0];

        // Check if the account already exists
        const checkAccountSql = 'SELECT * FROM account WHERE memberId = ?';
        const [accountResult] = await db.query(checkAccountSql, [memberId]);

        if (accountResult.length > 0) {
            return res.status(StatusCodes.CONFLICT).json('Account already exists');
        }

        // Construct dynamic SQL for account insertion
        const accountProp = new DynamicSql(payload);
        const insertAccountSql = `INSERT INTO account (${accountProp.fieldNames().join(', ')}, memberId, username) VALUES (?)`;
        const accountValues = [...accountProp.fieldValues(), memberId, memberData.username];

        const [result] = await db.query(insertAccountSql, [accountValues]);

        if (result.affectedRows > 0) return res.status(StatusCodes.CREATED).json('Account created successfully');
        
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getAccount = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const accountId = req.params.accountId;

        // Check if the account exists
        const checkAccountSql = 'SELECT * FROM account WHERE memberId = ? AND id = ?';
        const [result] = await db.query(checkAccountSql, [memberId, accountId]);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`Account with ID: ${accountId} not found`);
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};
const updateAccount = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const accountId = req.params.accountId;
        const payload = req.body;

        // Construct dynamic SQL for account update
        const accountProp = new DynamicSql(payload)

        const updateAccountSql = `UPDATE account SET ${accountProp.placeholder()} WHERE memberId = ? AND id = ?`;
        const updateValues = [...accountProp.fieldValues(), memberId, accountId];

        // Execute the update query
        const [result] = await db.query(updateAccountSql, updateValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Account with ID: ${accountId} not found`);
        }

        res.status(StatusCodes.OK).json("Account updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const deleteAccount = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const accountId = req.params.accountId;

        // Construct the SQL for account deletion
        const deleteAccountSql = 'DELETE FROM account WHERE memberId = ? AND id = ?';
        const deleteValues = [memberId, accountId];

        // Execute the deletion query
        const [result] = await db.query(deleteAccountSql, deleteValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Account with ID: ${accountId} not found`);
        }

        res.status(StatusCodes.OK).json(`Account with ID: ${accountId} has been deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const getAccounts = async (req, res) => {
    try {
        // Construct the SQL for fetching all accounts
        const getAccountsSql = 'SELECT * FROM account';

       // Execute the query
        const [result] = await db.query(getAccountsSql);

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('No accounts found');
        }

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addAccount,
    getAccount,
    updateAccount, 
    deleteAccount,
    getAccounts
}