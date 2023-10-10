const { productService } = require("../services");

/** create Product */
const createProduct = async (req, res) => {
    try {
        const reqBody = req.body;

        const product = await productService.createProduct(reqBody);
        if (!product) {
            throw new Error("something went wrong, please try again on later!");
        }

        res.status(200).json({
            success: true,
            message: "Product create successfully!",
            data: { product },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** get Product List */
const getProductList = async (req, res) => {
    try {
        const productList = await productService.getProductList(filter, options);

        res.status(200).json({
            success: true,
            message: "Get Product list successfully!",
            data: productList,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Get Product deatils by id */
const getProductDetails = async (req, res) => {
    try {
        const getDetails = await productService.getProductById(req.params.productId);
        if (!getDetails) {
            throw new Error("Product not found!");
        }

        res.status(200).json({
            success: true,
            message: "Product details get successfully!",
            data: getDetails,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Update Product */
const updateDetails = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productExists = await productService.getProductById(productId);
        if (!productExists) {
            throw new Error("Product not found!");
        }

        await productService.updateDetails(productId, req.body);

        res
            .status(200)
            .json({ success: true, message: "Product details update successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Delete Product */
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productExists = await productService.getProductById(productId);
        if (!productExists) {
            throw new Error("Product not found!");
        }

        await productService.deleteProduct(productId);

        res.status(200).json({
            success: true,
            message: "Product delete successfully!",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    createProduct,
    getProductList,
    getProductDetails,
    updateDetails,
    deleteProduct,
}