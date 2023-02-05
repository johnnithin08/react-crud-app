const { db } = require("../db-config");

const addExpense = async (req) => {
  const name = req.body.name;
  const category = req.body.category;
  const amount = req.body.amount;
  try {
    const query = `INSERT INTO expenseCrud.expenses VALUES (DEFAULT, ?, ?, ?);`;
    const [data] = await db.execute(query, [name, category, amount]);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { addExpense };
