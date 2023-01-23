const { db } = require("../db-config");

const editExpense = (req) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const amount = req.body.amount;
  const query = `UPDATE dummy_table SET name = ?,  category = ?, amount = ? WHERE id = ?;`;
  return new Promise((reject, resolve) => {
    db.query(query, [name, category, amount, id], (err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { editExpense };
