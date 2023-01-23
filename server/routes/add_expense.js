const { db } = require("../db-config");

const addExpense = (req) => {
  const name = req.body.name;
  const category = req.body.category;
  const amount = req.body.amount;
  const query = `INSERT INTO dummy_table VALUES (DEFAULT, ?, ?, ?);`;
  return new Promise((reject, resolve) => {
    db.query(query, [name, category, amount], (err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { addExpense };
