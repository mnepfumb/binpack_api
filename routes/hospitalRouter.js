const express = require('express');

const {
    getAllHospital,
    createHospital,
    getSingleHospital,
    updateHospital,
    deleteSingleHospital
} = require("../controllers/hospitalControllers");

const {
    verifyAccessToken
} = require("../controllers/authController");

const hospitalRouter = express.Router();

// Routers
hospitalRouter.route("/").get(getAllHospital).post(createHospital);
hospitalRouter.route("/:id").get(verifyAccessToken, getSingleHospital).patch(verifyAccessToken, updateHospital).delete(verifyAccessToken, deleteSingleHospital);

module.exports = hospitalRouter;