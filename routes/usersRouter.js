const express = require('express');
// const usersControllers = require("../controllers/usersControllers");

const {
    getAllUsers,
    createUser,
    getSingleUsers,
    updateUsers,
    deleteSingleUsers,
} = require("../controllers/usersControllers");

const {
    verifyAccessToken
} = require("../controllers/authController");

const usersRouter = express.Router();

// Routers
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(verifyAccessToken, getSingleUsers).patch(verifyAccessToken, updateUsers).delete(verifyAccessToken, deleteSingleUsers);

module.exports = usersRouter;
