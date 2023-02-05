const { db } = require("../db-config");

const editExpense = async (req) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const amount = req.body.amount;
  try {
    const query = `UPDATE expenseCrud.expenses SET name = ?,  category = ?, amount = ? WHERE id = ?;`;
    const [data] = await db.execute(query, [name, category, amount, id]);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { editExpense };
