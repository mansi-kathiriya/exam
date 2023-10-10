const { categoryService } = require("../services");

/** create Category */
const createCategory = async (req, res) => {
    try {
        const reqBody = req.body;

        const categoryExists = await categoryService.getCategoryByEmail(reqBody.email);
        if (categoryExists) {
            throw new Error("Category already craeted by this email!");
        }

        const category = await categoryService.createCategory(reqBody);
        if (!category) {
            throw new Error("something went wrong, please try again on later!");
        }

        res.status(200).json({
            success: true,
            message: "Category create successfully!",
            data: { category },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** get Category List */
const getCategoryList = async (req, res) => {
    try {
        const categoryList = await categoryService.getCategoryList(filter, options);

        res.status(200).json({
            success: true,
            message: "Get Category list successfully!",
            data: categoryList,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Get Category deatils by id */
const getCategoryDetails = async (req, res) => {
    try {
        const getDetails = await categoryService.getCategoryById(req.params.categoryId);
        if (!getDetails) {
            throw new Error("Category not found!");
        }

        res.status(200).json({
            success: true,
            message: "Category details get successfully!",
            data: getDetails,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Update Category */
const updateDetails = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const categoryExists = await categoryService.getCategoryById(categoryId);
        if (!categoryExists) {
            throw new Error("Category not found!");
        }

        await categoryService.updateDetails(categoryId, req.body);

        res
            .status(200)
            .json({ success: true, message: "Category details update successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Delete Category */
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const categoryExists = await categoryService.getCategoryById(categoryId);
        if (!categoryExists) {
            throw new Error("Category not found!");
        }

        await categoryService.deleteCategory(categoryId);

        res.status(200).json({
            success: true,
            message: "Category delete successfully!",
        });
    } catch (error) {

    }
};

module.exports = {
    createCategory,
    getCategoryList,
    getCategoryDetails,
    updateDetails,
    deleteCategory,
}