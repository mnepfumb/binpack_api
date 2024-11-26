const express = require('express');

const {
    getAllCompany,
    createCompany,
    getSingleCompany,
    updateCompany,
    deleteSingleCompany
} = require("../controllers/companiesControllers");

const {
    verifyAccessToken
} = require("../controllers/authController");

const companyRouter = express.Router();

// Routers
companyRouter.route("/").get(getAllCompany).post(verifyAccessToken, createCompany);
companyRouter.route("/:id").get(verifyAccessToken, getSingleCompany).patch(verifyAccessToken, updateCompany).delete(verifyAccessToken, deleteSingleCompany);

module.exports = companyRouter;