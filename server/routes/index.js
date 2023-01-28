const express = require("express");
const { addExpense } = require("./add_expense");
const { deleteExpense } = require("./delete_expense");
const { getExpenses } = require("./get_expenses");
const { editExpense } = require("./edit_expense");
const { getExpense } = require("./get_expense");
const { getGroupedExpenses } = require("./get_grouped_expenses");
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
    const expensesResult = await getExpenses();
    res.send({ status: 200, data: expensesResult });
  } catch (err) {
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
  try {
    const deleteExpensesResult = await deleteExpense(req);
    res.send({ status: 200, data: deleteExpensesResult });
  } catch (err) {
    res.send({ status: 400, message: err });
  }
});

module.exports = { router };
