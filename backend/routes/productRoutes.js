const express = require("express");
const router = express.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const ProductSchema = require("../apiSchema/productSchema");
const productController = require("../controllers/productController");

//router to create a new product
router.post(
  "/",
  joiSchemaValidation.validateBody(ProductSchema.createProductSchema),
  productController.createProduct
);

//router to get all products
router.get(
  "/",
  joiSchemaValidation.validateQueryParams(ProductSchema.getAllProductsSchema),
  productController.getAllProducts
);

//router to get a specific product
router.get("/:id", productController.getProductById);

//router to update a specific product
router.put(
  "/:id",
  joiSchemaValidation.validateQueryParams(ProductSchema.updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
