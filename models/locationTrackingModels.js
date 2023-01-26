const mongoose = require("mongoose");

const locationTrackerSchema = new mongoose.Schema({
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    user_id: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const LOCATIONTRACKING = mongoose.model("LOCATIONTRACKING", locationTrackerSchema);

module.exports = LOCATIONTRACKING