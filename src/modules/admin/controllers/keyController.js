import { StatusCodes } from 'http-status-codes'
import db from '../../../../util/db.js'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcryptjs'

export const keyGenerator = async (req, res) => {
    try {
        const id = req.user.id;

        const cookies = req.cookies;

        // Check if cookies exist
        if (!cookies?.jwt) {
            return res.status(StatusCodes.UNAUTHORIZED).json('No cookies with jwt');
        }

        const values = [id];

        // Get user data from the database
        const [userDataResult] = await db.query('SELECT * FROM users WHERE id = ?', values);
        const userData = userDataResult[0];

        // Check if keys already exist in the DB
        if (!userData.api_key || !userData.secret_key || !userData.hashSecretKey) {
            // Generate keys
            const api_key = formatUUID(uuidv4(), 'pk');
            const secret_key = formatUUID(uuidv4(), 'sk');

            // Hash secret key
            const hashSecretKey = hashKeys(secret_key);

            // Update user with keys
            const updateKeysSql = 'UPDATE users SET api_key = ?, secret_key = ?, secret_key_hash = ? WHERE id = ?';
            const updateKeysValues = [api_key, secret_key, hashSecretKey, id];

            // Execute the update query
            await db.query(updateKeysSql, updateKeysValues);

            return res.status(StatusCodes.OK).json('Generated API keys successfully');
        } else {
            return res.status(StatusCodes.CONFLICT).json('Keys already exist');
        }
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

// util hash func
function hashKeys (key){
    const SALT = uuidv4()
    return  bcrypt.hashSync(SALT + key + process.env.PEPPER, 10)
}
function formatUUID(uuid, prefix) {
  // Remove dashes and add prefix
  return `${prefix}_` + uuid.replace(/-/g, '');
}

// export default keyGenerator