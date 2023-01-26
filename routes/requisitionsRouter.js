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
    protect
} = require("../controllers/authController");

const requisitionsRouter = express.Router();

// STATS ROUTE
requisitionsRouter.route("/requisition-stats").get(getRequisitionStats);


// PLANS ROUTE
// requisitionsRouter.route("/requisition-plan/:year").get(getRequisitionPlan);

// Routers
requisitionsRouter.route("/hospital/").get(protect, getRequisitionByCompany);
requisitionsRouter.route("/").get(protect, getAllRequisition).post(createRequisition);
requisitionsRouter.route("/:id").get(protect, getSingleRequisition).put(protect, updateRequisition).delete(protect, deleteSingleRequisition);

module.exports = requisitionsRouter;