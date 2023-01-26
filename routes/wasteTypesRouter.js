const express = require('express');

const {
    getAllWasteType,
    createWasteType,
    // getSingleUsers,
    // updateUsers,
    deleteSingleWasteType
} = require("../controllers/wasteTypesControllers");

const wasteTypesRouter = express.Router();

// Routers
wasteTypesRouter.route("/").get(getAllWasteType).post(createWasteType);
// wasteTypesRouter.route("/:id").get(getSingleUsers).patch(updateUsers);
wasteTypesRouter.route("/:id").delete(deleteSingleWasteType);

module.exports = wasteTypesRouter;