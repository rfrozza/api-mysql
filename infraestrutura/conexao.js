const mysql = require('mysql2')

const conexao = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'username',
   password: 'password',
   database: 'agenda-petshop'
})

module.exports = conexao