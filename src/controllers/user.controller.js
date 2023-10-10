const { userService, emailService } = require("../services");
const path = require("path");

/** create User */
const createUser = async (req, res) => {
    try {
        const reqBody = req.body;

        const userExists = await userService.getUserByEmail(reqBody.email);
        if (userExists) {
            throw new Error("User already craeted by this email!");
        }

        const user = await userService.createUser(reqBody);
        if (!user) {
            throw new Error("something went wrong, please try again on later!");
        }

        res.status(200).json({
            success: true,
            message: "user create successfully!",
            data: { user },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** get User List */
const getUserList = async (req, res) => {
    try {
        const userList = await userService.getUserList(filter, options);

        res.status(200).json({
            success: true,
            message: "Get user list successfully!",
            data: userList,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Get user deatils by id */
const getUserDetails = async (req, res) => {
    try {
        const getDetails = await userService.getUserById(req.params.userId);
        if (!getDetails) {
            throw new Error("User not found!");
        }

        res.status(200).json({
            success: true,
            message: "User details get successfully!",
            data: getDetails,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Update user */
const updateDetails = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userExists = await userService.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found!");
        }

        await userService.updateDetails(userId, req.body);

        res
            .status(200)
            .json({ success: true, message: "User details update successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/** Delete User */
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userExists = await userService.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found!");
        }

        await userService.deleteUser(userId);

        res.status(200).json({
            success: true,
            message: "User delete successfully!",
        });
    } catch (error) {

    }
};

/** Send mail to requsted email*/
const sendMail = async (req, res) => {
    try {
        const reqBody = req.body;
        const sendEmail = await emailService.sendMail(
            reqBody.email,
            reqBody.subject,
            reqBody.text
        );
        if(!sendEmail){
            throw new Error("something went wrong, please try again or later");
        }

        res.status(200).json({
            success: true,
            message: "Email send successfully!",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    createUser,
    getUserList,
    getUserDetails,
    updateDetails,
    deleteUser,
    sendMail,
}