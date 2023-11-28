import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: "127.0.0.1" ||'localhost',
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})


const db = pool
export default db 