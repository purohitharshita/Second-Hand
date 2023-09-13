const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

router.post("/:id/specifications", productController.createSpecification);
router.put(
  "/:productId/specifications/:specificationId",
  productController.updateSpecification
);
router.delete(
  "/:productId/specifications/:specificationId",
  productController.deleteSpecification
);

module.exports = router;
