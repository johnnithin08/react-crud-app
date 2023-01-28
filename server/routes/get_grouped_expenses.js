const { db } = require("../db-config");

const getGroupedExpenses = async () => {
  const query = `SELECT category AS name, SUM(amount) AS amount FROM dummy_table GROUP BY category;`;
  return new Promise((reject, resolve) => {
    db.query(query, (err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { getGroupedExpenses };
