const pool = require("../config/db");

const getTransactions = async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT
    t.*,
    c.name AS customer_name,
    cat.name AS category_name
  FROM transactions t
  LEFT JOIN customers c
    ON t.customer_id = c.id
  LEFT JOIN categories cat
    ON t.category_id = cat.id
  ORDER BY t.id DESC
`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      type,
      customer_id,
      category_id,
      amount,
      payment_method,
      description,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO transactions
      (
        type,
        customer_id,
        category_id,
        amount,
        payment_method,
        description
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        type,
        customer_id || null,
        category_id || null,
        amount,
        payment_method,
        description,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create transaction",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      type,
      customer_id,
      category_id,
      amount,
      payment_method,
      description,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE transactions
      SET
        type = $1,
        customer_id = $2,
        category_id = $3,
        amount = $4,
        payment_method = $5,
        description = $6
      WHERE id = $7
      RETURNING *
      `,
      [
        type,
        customer_id || null,
        category_id || null,
        amount,
        payment_method,
        description,
        id,
      ],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update transaction",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM transactions WHERE id = $1", [id]);

    res.json({
      message: "Transaction deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete transaction",
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
