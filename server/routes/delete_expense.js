const { db } = require("../db-config");

const deleteExpense = async (req) => {
  const id = req.body.id;
  try {
    const query = `DELETE FROM expenseCrud.expenses WHERE	id = ?`;
    const [data] = await db.execute(query, [id]);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { deleteExpense };
