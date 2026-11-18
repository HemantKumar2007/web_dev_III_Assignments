const Product = require("../models/Product");

// Add a new product
const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// Get all products with filtering, sorting and pagination
const getProducts = async (req, res, next) => {
  try {
    const { category, sort, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const sortOption = sort ? { price: sort === "desc" ? -1 : 1 } : {};

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({
      message: "Products fetched successfully",
      products
    });
  } catch (error) {
    next(error);
  }
};

// Get a single product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Update product details
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// Adjust stock
const adjustStock = async (req, res, next) => {
  try {
    const { operation, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Please enter a valid quantity" });
    }

    if (operation === "restock") {
      product.stock += quantity;
    } else if (operation === "sale") {
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock available" });
      }

      product.stock -= quantity;
    } else {
      return res.status(400).json({ message: "Invalid stock operation" });
    }

    await product.save();

    res.status(200).json({
      message: "Stock adjusted successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get products that have low stock
const lowStockReport = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      {
        $project: {
          productName: 1,
          category: 1,
          stock: 1,
          reorderLevel: 1
        }
      },
      {
        $match: {
          $expr: { $lte: ["$stock", "$reorderLevel"] }
        }
      }
    ]);

    res.status(200).json({
      message: "Low stock report generated successfully",
      products
    });
  } catch (error) {
    next(error);
  }
};

// Get category-wise inventory summary
const categorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          totalStock: { $sum: "$stock" },
          totalValue: {
            $sum: { $multiply: ["$price", "$stock"] }
          }
        }
      }
    ]);

    res.status(200).json({
      message: "Category summary generated successfully",
      summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct
};