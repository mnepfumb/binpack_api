const mongoose = require("mongoose");

const wasteTypeSchema = new mongoose.Schema({
    type: {
        type: String
    },
});

const WASTETYPE = mongoose.model("WASTETYPE", wasteTypeSchema);

module.exports = WASTETYPE