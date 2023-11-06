import mysql from 'mysql'
import util from "util"

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

pool.query = util.promisify(pool.query)

const db = pool
export default db 