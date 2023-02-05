const { db } = require("../db-config");

const getExpense = async (req) => {
  console.log("enter inside", req);
  const id = req.body.id;
  const query = `SELECT * FROM dummy_table WHERE id = ?;`;
  try {
    const [data] = await db.execute(query, [id]);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { getExpense };
