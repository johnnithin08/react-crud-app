const { db } = require("../db-config");

const getExpenses = async () => {
  const query = `SELECT * FROM dummy_table`;
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

module.exports = { getExpenses };
