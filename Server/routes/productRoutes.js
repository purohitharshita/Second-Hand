const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a product
router.post("/", productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Update a product by ID
router.put("/:id", productController.updateProductById);

// Delete a product by ID
router.delete("/:id", productController.deleteProductById);

// Add an image to a product
router.post("/:id/images", productController.addImageToProduct);

// Remove an image from a product
router.delete(
  "/:id/images/:imageIndex",
  productController.removeImageFromProduct
);

// Add a specification to a product
router.post("/:id/specifications", productController.addSpecificationToProduct);

// Update a specification of a product
router.put(
  "/:id/specifications/:specificationId",
  productController.updateProductSpecification
);

// Remove a specification from a product
router.delete(
  "/:id/specifications/:specificationId",
  productController.removeProductSpecification
);

module.exports = router;
