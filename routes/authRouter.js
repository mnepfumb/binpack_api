const express = require('express');
// const usersControllers = require("../controllers/usersControllers");


const {
    getUsersStates
} = require("../controllers/usersControllers");

const {
    signup,
    signin,
    verifyAccessToken,
    verifyRefreshToken
} = require("../controllers/authController");

const authRouter = express.Router();

// SignUp
authRouter.route("/signup").post(signup);
authRouter.route("/signin").post(signin);
authRouter.route("/refresh").post(verifyAccessToken, verifyRefreshToken);
authRouter.route("/userstates").get(getUsersStates);


module.exports = authRouter;
