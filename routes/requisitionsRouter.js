const express = require('express');
// const usersControllers = require("../controllers/usersControllers");

const {
    getAllRequisition,
    createRequisition,
    getSingleRequisition,
    updateRequisition,
    deleteSingleRequisition,
    getRequisitionStats,
    getRequisitionByCompany,
    getRequisitionPlan
} = require("../controllers/requisitionsControllers");

const {
    verifyAccessToken
} = require("../controllers/authController");

const requisitionsRouter = express.Router();

// STATS ROUTE
requisitionsRouter.route("/requisition-stats").get(getRequisitionStats);


// PLANS ROUTE
// requisitionsRouter.route("/requisition-plan/:year").get(getRequisitionPlan);

// Routers
requisitionsRouter.route("/hospital/").get(verifyAccessToken, getRequisitionByCompany);
requisitionsRouter.route("/").get( getAllRequisition).post(createRequisition);
requisitionsRouter.route("/:id").get(verifyAccessToken, getSingleRequisition).put(verifyAccessToken, updateRequisition).delete(verifyAccessToken, deleteSingleRequisition);

module.exports = requisitionsRouter;