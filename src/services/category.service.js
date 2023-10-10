const { Category } = require("../models");

/** Create Category */
const createCategory = async (reqBody) => {
    return Category.create(reqBody);
};

/** get Category List */
const getCategoryList = async (filter, options) => {
    return Category.find()
};

/** Get Category by email */
const getCategoryByEmail = async (email) => {
    return Category.findOne({ email });
};

/** Get Category deatils by id */
const getCategoryById = async (CategoryId) => {
    return Category.findById(CategoryId);
}

/** Category details update by id */
const updateDetails = async (CategoryId, updateBody) => {
    return Category.findByIdAndUpdate(CategoryId, { $set: updateBody });
}

/** Delete Category */
const deleteCategory = async (CategoryId) => {
    return Category.findByIdAndDelete(CategoryId);
}

module.exports = {
    createCategory,
    getCategoryList,
    getCategoryByEmail,
    getCategoryById,
    updateDetails,
    deleteCategory,
};