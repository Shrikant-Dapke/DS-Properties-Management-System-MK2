const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const customersResult = await pool.query(
      "SELECT COUNT(*) FROM customers"
    );

    const incomeResult = await pool.query(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM transactions
      WHERE type='INCOME'
    `);

    const expenseResult = await pool.query(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM transactions
      WHERE type='EXPENSE'
    `);

    const totalCustomers = Number(
      customersResult.rows[0].count
    );

    const totalIncome = Number(
      incomeResult.rows[0].total
    );

    const totalExpense = Number(
      expenseResult.rows[0].total
    );

    res.json({
      totalCustomers,
      totalIncome,
      totalExpense,
      currentBalance:
        totalIncome - totalExpense,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};  