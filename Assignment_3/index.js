const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { errorMiddleware } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const { validateProduct } = require("../middleware/errorMiddleware");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Product routes
app.use("/api/products", productRoutes);

// Centralized error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});