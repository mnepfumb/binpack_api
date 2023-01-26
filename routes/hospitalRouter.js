const express = require('express');

const {
    getAllHospital,
    createHospital,
    getSingleHospital,
    updateHospital,
    deleteSingleHospital
} = require("../controllers/hospitalControllers");

const {
    protect
} = require("../controllers/authController");

const hospitalRouter = express.Router();

// Routers
hospitalRouter.route("/").get(protect, getAllHospital).post(protect, createHospital);
hospitalRouter.route("/:id").get(protect, getSingleHospital).patch(protect, updateHospital).delete(protect, deleteSingleHospital);

module.exports = hospitalRouter;