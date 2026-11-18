// Validate product details before saving
const validateProduct = (req, res, next) => {
  const {
    productName,
    productCode,
    category,
    price,
    stock,
    reorderLevel,
    supplierName
  } = req.body;

  if (
    !productName ||
    !productCode ||
    !category ||
    price === undefined ||
    stock === undefined ||
    reorderLevel === undefined ||
    !supplierName
  ) {
    return res.status(400).json({
      message: "Please provide all product details"
    });
  }

  if (price < 0 || stock < 0 || reorderLevel < 0) {
    return res.status(400).json({
      message: "Price and stock values cannot be negative"
    });
  }

  next();
};

// Centralized error handling middleware
const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({
    message: "Internal Server Error"
  });
};

module.exports = {
  validateProduct,
  errorMiddleware
};