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
    verifyAccessToken
} = require("../controllers/authController");


const manifestRouter = express.Router();

// Routers
manifestRouter.route("/").post(verifyAccessToken, createManifest); //.get(getAllManifest)
manifestRouter.route("/requisionId").get(verifyAccessToken, getManifestbyRequisionId);
manifestRouter.route("/:id").get(verifyAccessToken, getSingleManifest).patch(verifyAccessToken, updateManifest).delete(verifyAccessToken, deleteSingleManifest);

module.exports = manifestRouter;