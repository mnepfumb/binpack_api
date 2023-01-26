const express = require('express');

const {
    // getAllManifest,
    createManifest,
    getSingleManifest,
    updateManifest,
    deleteSingleManifest,
    getManifestbyRequisionId
} = require("../controllers/manifestControllers");

const {
    protect
} = require("../controllers/authController");


const manifestRouter = express.Router();

// Routers
manifestRouter.route("/").post(protect, createManifest); //.get(getAllManifest)
manifestRouter.route("/requisionId").get(protect, getManifestbyRequisionId);
manifestRouter.route("/:id").get(protect, getSingleManifest).patch(protect, updateManifest).delete(protect, deleteSingleManifest);

module.exports = manifestRouter;