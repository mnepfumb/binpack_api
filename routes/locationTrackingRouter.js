const express = require('express');

const {
    getAllLocationTracker,
    createLocationTracker,
    getSingleLocationTracker,
    updateLocationTracker,
    deleteSingleLocationTracker
} = require("../controllers/locationTrackingControllers");

const {
    protect
} = require("../controllers/authController");


const locationTrackingRouter = express.Router();

// Routers
locationTrackingRouter.route("/").get(protect, getAllLocationTracker).post(protect, createLocationTracker);
locationTrackingRouter.route("/:id").get(protect, getSingleLocationTracker).patch(protect, updateLocationTracker);

module.exports = locationTrackingRouter;