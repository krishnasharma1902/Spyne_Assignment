const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '356220',
    database: 'spyne'
});

module.exports = pool.promise();
