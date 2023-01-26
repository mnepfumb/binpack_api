const express = require('express');

const {
    getAllCompany,
    createCompany,
    getSingleCompany,
    updateCompany,
    deleteSingleCompany
} = require("../controllers/companiesControllers");

const {
    protect
} = require("../controllers/authController");

const companyRouter = express.Router();

// Routers
companyRouter.route("/").get(protect, getAllCompany).post(protect, createCompany);
companyRouter.route("/:id").get(protect, getSingleCompany).patch(protect, updateCompany).delete(protect, deleteSingleCompany);

module.exports = companyRouter;