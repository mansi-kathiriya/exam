const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config");

const auth = () => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(res.status(401).json({
                status: 401,
                meassage: "please authenticate!"
            }));
        }

        const decoded = jwt.verify(
            token.replace("Bearer ", ""),
            config.jwt.secret_key
        );

        if (!decoded) {
            return next(new Error("please enter valid token!"));
        }

        const user = await User.findOne({ _id: decoded.user });
        if (!user) {
            return next(new Error("please authenticate!"));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new Error(error));
    }
};

module.exports = auth;