const { db } = require("../db-config");

const getExpense = async (req) => {
  const id = req.body.id;
  const query = `SELECT * FROM expenseCrud.expenses WHERE id = ?;`;
  try {
    const [data] = await db.execute(query, [id]);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { getExpense };
