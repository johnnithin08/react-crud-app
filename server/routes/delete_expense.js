const { db } = require("../db-config");

const deleteExpense = (req) => {
  const id = req.body.id;
  const query = `DELETE FROM dummy_table WHERE 	id = ?`;
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

module.exports = { deleteExpense };
