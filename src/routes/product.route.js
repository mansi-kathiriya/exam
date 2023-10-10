const express = require("express");
const { productValidation } = require("../../validations");
const { productController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

/** Create Product */
router.post(
    "/create-Product",
    validate(ProductValidation.createProduct),
    ProductController.createProduct
);

/** Get Product */
router.get(
    "/Product-list",
    ProductController.getProductList
);

/** Get Product deatils by id */
router.get(
    "/Product-details/:ProductId",
    ProductController.getProductDetails
);

/** Update Product */
router.put(
    "/update-details/:ProductId",
    ProductController.updateDetails
);

/** Delete Product */
router.delete(
    "/Product-delete/:ProductId",
    ProductController.deleteProduct
);

module.exports = router;