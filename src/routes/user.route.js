const express = require("express");
const { userValidation } = require("../validations");
const { userController } = require("../controllers");
const validate = require("../middlewares/validate");

const router = express.Router();

/** Create user */
router.post(
    "/create-user",
    validate(userValidation.createUser),
    userController.createUser
);

/** Get user */
router.get(
    "/user-list",
    userController.getUserList
);

/** Get user deatils by id */
router.get(
    "/user-details/:userId",
    userController.getUserDetails
);

/** Update user */
router.put(
    "/update-details/:userId",
    userController.updateDetails
);

/** Delete user */
router.delete(
    "/user-delete/:userId",
    userController.deleteUser
);

/** Send mail */
router.post(
    "/send-mail",
    userController.sendMail
)

module.exports = router;