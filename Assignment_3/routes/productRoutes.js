const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  lowStockReport,
  categorySummary
} = require("../controllers/productController");

// Add a product
router.post("/", validateProduct, addProduct);

// Get all products
router.get("/", getProducts);

// Adjust product stock
router.patch("/:id/stock", adjustStock);

// Update product details
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Get a product by ID
router.get("/:id", getProductById);

// Get low stock report
router.get("/reports/low-stock", lowStockReport);

// Get category-wise inventory summary
router.get("/reports/category-summary", categorySummary);

module.exports = router;