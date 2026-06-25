const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/dashboard", dashboardRoutes);
app.use("/customers", customerRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "DS Properties API Running",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
