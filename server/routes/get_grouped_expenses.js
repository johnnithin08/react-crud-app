const { db } = require("../db-config");

const getGroupedExpenses = async () => {
  const query = `SELECT category AS name, SUM(amount) AS amount FROM dummy_table GROUP BY category;`;
  try {
    const [data] = await db.execute(query);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { getGroupedExpenses };
