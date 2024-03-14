const mysql=require('mysql2/promise');

const mysqlpool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'shopclues'
})


module.exports = mysqlpool