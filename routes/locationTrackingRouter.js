const express = require('express');

const {
    getAllLocationTracker,
    createLocationTracker,
    getSingleLocationTracker,
    updateLocationTracker,
    deleteSingleLocationTracker
} = require("../controllers/locationTrackingControllers");

const {
    verifyAccessToken
} = require("../controllers/authController");


const locationTrackingRouter = express.Router();

// Routers
locationTrackingRouter.route("/").get(verifyAccessToken, getAllLocationTracker).post(verifyAccessToken, createLocationTracker);
locationTrackingRouter.route("/:id").get(verifyAccessToken, getSingleLocationTracker).patch(verifyAccessToken, updateLocationTracker);

module.exports = locationTrackingRouter;