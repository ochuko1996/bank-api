import db from '../../../../util/db.js'
import { StatusCodes } from 'http-status-codes'
import DynamicSql from '../../../../util/dynamicSql.js'
// Get all users
const getUsers = async (req, res) => {
    try {
        const sql = `SELECT * FROM users`;
        const [result] = await db.query(sql);

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Get a specific user
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `SELECT * FROM users WHERE id = ?`;
        const values = [userId];
        const [result] = await db.query(sql, values);

        if (!result[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${userId} not found`);
        }

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Update user details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const payload = req.body;

        const UserProp = new DynamicSql(payload);
        const sql = `UPDATE users SET ${UserProp.placeholder()} WHERE id = ?`;
        const values = [userId];
        const [result] = await db.query(sql, [...UserProp.fieldValues(), ...values]);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${userId} not found`);
        }

        return res.status(StatusCodes.OK).json(`User with id: ${userId} updated successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `DELETE FROM users WHERE id = ?`;
        const values = [userId];
        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${userId} not found`);
        }

        return res.status(StatusCodes.OK).json(`User with id: ${userId} deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};



export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}
