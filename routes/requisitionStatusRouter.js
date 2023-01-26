const express = require('express');
// const usersControllers = require("../controllers/usersControllers");

const {
    getAllRequisitionStatus,
    createRequisitionStatus,
    getSingleRequisitionStatus,
    updateRequisitionStatus,
    deleteSingleRequisitionStatus
} = require("../controllers/requisitionStatusControllers");

const requisitionStatusRouter = express.Router();

// Routers
requisitionStatusRouter.route("/").get(getAllRequisitionStatus).post(createRequisitionStatus);
requisitionStatusRouter.route("/:id").get(getSingleRequisitionStatus).patch(updateRequisitionStatus);

module.exports = requisitionStatusRouter;