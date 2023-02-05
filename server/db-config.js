const mysql = require("mysql2/promise");
// const db = mysql.createConnection({
//   host: "expense-database.cyyu5a4uwm2l.ap-south-1.rds.amazonaws.com",
//   user: "admin",
//   password: "password",
//   port: 3306,
// });

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "new_database",
});

module.exports = { db };
