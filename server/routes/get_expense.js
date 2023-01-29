const { db } = require("../db-config");

const getExpense = (req) => {
  console.log("enter inside", req);
  const id = req.body.id;
  const query = `SELECT * FROM dummy_table WHERE id = ?;`;
  return new Promise((reject, resolve) => {
    db.query(query, [id], (err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { getExpense };
