const { db } = require("../db-config");

const getExpenses = async () => {
  const query = `SELECT * FROM expenseCrud.expenses`;
  try {
    const [data] = await db.execute(query);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { getExpenses };
