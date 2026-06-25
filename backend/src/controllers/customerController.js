const pool = require("../config/db");

const getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, phone, plot_number, address, notes } = req.body;

    const result = await pool.query(
      `
      INSERT INTO customers
      (name, phone, plot_number, address, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name, phone, plot_number, address, notes],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create customer",
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM customers WHERE id = $1", [id]);

    res.json({
      message: "Customer deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete customer",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, plot_number, address, notes } = req.body;

    const result = await pool.query(
      `
      UPDATE customers
      SET
        name = $1,
        phone = $2,
        plot_number = $3,
        address = $4,
        notes = $5
      WHERE id = $6
      RETURNING *
      `,
      [name, phone, plot_number, address, notes, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update customer",
    });
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};