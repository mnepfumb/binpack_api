const mongoose = require("mongoose");

const requisitionStatusSchema = new mongoose.Schema({
    status: {
        type: String
    },
});

const REQUISITIONSTATUS = mongoose.model("REQUISITIONSTATUS", requisitionStatusSchema);

module.exports = REQUISITIONSTATUS