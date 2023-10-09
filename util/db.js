const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

pool.query = util.promisify(pool.query)

module.exports = pool