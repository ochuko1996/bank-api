import { StatusCodes } from 'http-status-codes'
import db from '../../../../util/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, username, password } = req.body;

        // Check if user exists
        const checkUserSql = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await db.query(checkUserSql, [email]);

        if (existingUser.length) {
            return res.status(StatusCodes.CONFLICT).json('User already exists');
        }

        // Hash password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Insert new user
        const insertUserSql = 'INSERT INTO users (name, email, phone, username, password) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, phone, username, hashedPwd];

        const [result] = await db.query(insertUserSql, values);

        if (result.affectedRows > 0) return res.status(StatusCodes.CREATED).json('User created');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const checkUserSql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(checkUserSql, [email]);

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json('User not found');
        }

        const data = result[0];

        // Check password
        const checkPassword = await bcrypt.compare(password, data.password);

        if (!checkPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json('Wrong password or email');
        }

        // Create JWT token
        const token = jwt.sign(serializedUser(data), process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Set JWT token as a cookie
        res.cookie('jwt', token, {
            httponly: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true // uncomment this line when going online or using in chrome
        });

        return res.status(StatusCodes.ACCEPTED).json({
            token,
            user: serializedUser(data),
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};

const logout = async (req, res) => {
    try {
        // Clear JWT cookie
        res.clearCookie('jwt', {
            httponly: true,
            sameSite: 'none',
            maxAge: 0, // Setting maxAge to 0 clears the cookie
            // secure: true // uncomment this line when going online or using in chrome
        });

        return res.status(StatusCodes.OK).json('User has been logged out');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
    }
};


function serializedUser(user){
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}
export {
    registerUser,
    login,
    logout
}
