const express = require("express");
const { addExpense } = require("./add_expense");
const { deleteExpense } = require("./delete_expense");
const { getExpenses } = require("./get_expenses");
const { editExpense } = require("./edit_expense");
const { getExpense } = require("./get_expense");
const { getGroupedExpenses } = require("./get_grouped_expenses");
const { db } = require("../db-config");
const router = express.Router();

router.post("/add_expense", async (req, res) => {
  try {
    const addExpenseResult = await addExpense(req);
    res.send({ status: 200, data: addExpenseResult });
  } catch (err) {
    res.send({ status: 400, message: err });
  }
});

router.get("/get_expenses", async (req, res) => {
  try {
    // const query = `SELECT * FROM dummy_table`;
    // return new Promise((reject, resolve) => {
    // const dbResponse = db.query(query, (err, result) => {
    //   if (result !== undefined) {
    //     return result;
    //   } else {
    //     return err;
    //   }
    // });
    // dbResponse.then((resp) => console.log("promise", resp));
    // });
    // console.log("resp", dbResponse);
    const expensesResult = await getExpenses();
    // expensesResult.then((res) => console.log("after then", res));
    // const promiseResponse = Promise.all(expensesResult);
    console.log("res", expensesResult);
    res.send({ status: 200, data: expensesResult });
  } catch (err) {
    console.log("res error", err);
    res.send({ status: 400, message: err });
  }
});

router.get("/get_grouped_expenses", async (req, res) => {
  console.log("enter");
  try {
    const expensesResult = await getGroupedExpenses();
    res.send({ status: 200, data: expensesResult });
  } catch (err) {
    res.send({ status: 400, message: err });
  }
});

router.post("/get_expense", async (req, res) => {
  console.log("enter");
  try {
    const expenseResult = await getExpense(req);
    console.log("resp", expenseResult);
    res.send({ status: 200, data: expenseResult });
  } catch (err) {
    res.send({ status: 400, message: err });
  }
});

router.post("/edit_expense", async (req, res) => {
  try {
    const editExpenseResult = await editExpense(req);
    console.log("edit", editExpenseResult);
    res.send({ status: 200, data: editExpenseResult });
  } catch (err) {
    res.send({ status: 400, message: err });
  }
});

router.post("/delete_expense", async (req, res) => {
  // console.log("req", req);
  try {
    const deleteExpensesResult = await deleteExpense(req);
    res.send({ status: 200, data: deleteExpensesResult });
  } catch (err) {
    console.log("err", err);
    res.send({ status: 400, message: err });
  }
});

module.exports = { router };
