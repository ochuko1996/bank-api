import db from '../../../../util/db.js'
import DynamicSql from '../../../../util/dynamicSql.js'
import {StatusCodes} from 'http-status-codes'

// Add a new member
const addMember = async (req, res) => {
    try {
        const payload = req.body;
        const siteAppId = req.params.siteId;
        const MemberProp = new DynamicSql(payload);

        // Get API key from site app
        const [siteAppResult] = await db.query('SELECT api_key FROM site_app WHERE id = ?', [siteAppId]);
        const siteAppData = siteAppResult[0];

        if (!siteAppData) {
            return res.status(StatusCodes.BAD_REQUEST).json(`No site with id: ${siteAppId}`);
        }

        // Check for existing member
        const [existingMemberResult] = await db.query('SELECT * FROM members WHERE email = ?', [payload.email]);

        if (existingMemberResult[0]) {
            return res.status(StatusCodes.CONFLICT).json('Member already exists');
        }

        // Add new member
        const addMemberSql = `INSERT INTO members (${MemberProp.fieldNames().join(', ')}, site_app_id, api_key) VALUES (?)`;
        const addMemberValues = [...MemberProp.fieldValues(), siteAppId, siteAppData.api_key];

        await db.query(addMemberSql, [addMemberValues]);

        return res.status(StatusCodes.CREATED).json('Member created successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Get all members
const getMembers = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const [membersResult] = await db.query('SELECT * FROM members WHERE site_app_id = ?', [siteAppId]);
        const membersData = membersResult;

        if (membersData.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('No members found');
        }

        return res.status(StatusCodes.OK).json(membersData);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Get a specific member
const getMember = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const [memberResult] = await db.query('SELECT * FROM members WHERE site_app_id = ? AND id = ?', [siteAppId, memberId]);
        const memberData = memberResult[0];

        if (!memberData) {
            return res.status(StatusCodes.NOT_FOUND).json(`No member with id: ${memberId}`);
        }

        return res.status(StatusCodes.OK).json(memberData);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Delete a member
const deleteMember = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const [result] = await db.query('DELETE FROM members WHERE site_app_id = ? AND id = ?', [siteAppId, memberId]);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`No member with id: ${memberId}`);
        }

        return res.status(StatusCodes.OK).json(`Member with id: ${memberId} has been deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// Update member details
const updateMember = async (req, res) => {
    try {
        const siteAppId = req.params.siteId;
        const memberId = req.params.memberId;
        const payload = req.body;

        const MemberProp = new DynamicSql(payload);

        const updateMemberSql = `UPDATE members SET ${MemberProp.placeholder()} WHERE site_app_id = ? AND id = ?`;
        const updateMemberValues = [...MemberProp.fieldValues(), siteAppId, memberId];

        const [result] = await db.query(updateMemberSql, updateMemberValues);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json(`No member with id: ${memberId}`);
        }

        return res.status(StatusCodes.OK).json('Member details updated successfully');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


export {
    addMember,
    getMembers,
    getMember, 
    deleteMember,
    updateMember
}