const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    host: 'localhost',
    user: '',
    database: '',
    password: ''
})

pool.query = util.promisify(pool.query)

module.exports = pool