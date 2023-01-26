const express = require('express');
// const usersControllers = require("../controllers/usersControllers");

const {
    getAllUsers,
    createUser,
    getSingleUsers,
    updateUsers,
    deleteSingleUsers,
    getUsersStates
} = require("../controllers/usersControllers");

const {
    signup,
    signin,
    protect
} = require("../controllers/authController");

const usersRouter = express.Router();

// SignUp
usersRouter.route("/signup").post(signup);
usersRouter.route("/signin").post(signin);
usersRouter.route("/userstates").get(getUsersStates);

// Routers
usersRouter.route("/").get(protect, getAllUsers).post(createUser);
usersRouter.route("/:id").get(protect, getSingleUsers).patch(protect, updateUsers).delete(protect, deleteSingleUsers);

module.exports = usersRouter;
