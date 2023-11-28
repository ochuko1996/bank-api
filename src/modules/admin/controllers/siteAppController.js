import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'

// Add a new site app
const addSiteApp = async (req, res) => {
    try {
        const id = req.user.id;
        const SiteAppProps = new DynamicSql(req.body);

        const [userResult] = await db.query('SELECT secret_key, api_key, secret_key_hash FROM users WHERE id = ?', [id]);
        const userData = userResult[0];

        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json('User not found');
        }

        const compareSecretKey = await bcrypt.compare(userData.secret_key, userData.secret_key_hash);

        if (!compareSecretKey) {
            return res.status(StatusCodes.FORBIDDEN).json('Secret key is incorrect or does not exist');
        }

        const addSiteAppSql = `INSERT INTO site_app (${SiteAppProps.fieldNames().join(', ')}, api_key) VALUES (?)`;
        const addSiteAppValues = [...SiteAppProps.fieldValues(), userData.api_key];

        await db.query(addSiteAppSql, [addSiteAppValues]);

        return res.status(StatusCodes.OK).json('Site app created successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Get all site apps
const getAllSiteApp = async (req, res) => {
    try {
        const id = req.user.id;

        const [userResult] = await db.query('SELECT api_key FROM users WHERE id = ?', [id]);
        const userData = userResult[0];

        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json('User not found');
        }

        const [siteAppResult] = await db.query('SELECT * FROM site_app WHERE api_key = ?', [userData.api_key]);

        return res.status(StatusCodes.OK).json(siteAppResult);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Get a specific site app
const getSiteApp = async (req, res) => {
    try {
        const id = req.user.id;
        const siteAppId = req.params.id;

        const [userResult] = await db.query('SELECT api_key FROM users WHERE id = ?', [id]);
        const userData = userResult[0];

        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json('User not found');
        }

        const [siteAppResult] = await db.query('SELECT * FROM site_app WHERE api_key = ? AND id = ?', [userData.api_key, siteAppId]);

        if (siteAppResult.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with id: ${siteAppId} not found`);
        }

        return res.status(StatusCodes.OK).json(siteAppResult);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Update site app details
const updateSiteApp = async (req, res) => {
    try {
        const id = req.user.id;
        const siteAppId = req.params.id;
        const SiteAppProps = new DynamicSql(req.body);

        const [userResult] = await db.query('SELECT api_key FROM users WHERE id = ?', [id]);
        const userData = userResult[0];

        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json('User not found');
        }

        const updateSiteAppSql = `UPDATE site_app SET ${SiteAppProps.placeholder()} WHERE api_key = ? AND id = ?`;
        const updateSiteAppValues = [...SiteAppProps.fieldValues(), userData.api_key, siteAppId];

        const [result] = await db.query(updateSiteAppSql, updateSiteAppValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with id: ${siteAppId} not found`);
        }

        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Delete a site app
const deleteSiteApp = async (req, res) => {
    try {
        const id = req.user.id;
        const siteAppId = req.params.id;

        const [userResult] = await db.query('SELECT api_key FROM users WHERE id = ?', [id]);
        const userData = userResult[0];

        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json('User not found');
        }

        const [result] = await db.query('DELETE FROM site_app WHERE id = ? AND api_key = ?', [siteAppId, userData.api_key]);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`Site app with id: ${siteAppId} not found`);
        }

        return res.status(StatusCodes.OK).json('Site app successfully deleted');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addSiteApp,
    deleteSiteApp,
    getAllSiteApp,
    getSiteApp,
    updateSiteApp
}