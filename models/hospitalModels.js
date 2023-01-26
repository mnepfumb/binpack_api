const mongoose = require("mongoose");
const serial = require("generate-serial-key");

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ""],
        maxlength: [40, ]
    }, 
    phone: {
        type: String,
        required: [true, ""],
        maxlength: [12, ]
    },  
    email: {
        type: String,
        required: [true, ""]
    },  
    address: {
        type: String,
        required: [true, ""],
        maxlength: [40, ]
    }, 
    registration_no: {
        type: String,
        required: [true, ""],
        maxlength: [20, ]
    }, 
    tax_no: {
        type: String,
        required: [true, ""],
        maxlength: [10, ""]
    }, 
    client_id: {
        type: String
    },
    hospital_id: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now()
    }, 
    updated_at: {
        type: Date
    },
});

hospitalSchema.pre("save", function (next) {
    var serial_num = serial.generate();
    console.log(serial_num);
    this.hospital_id = serial_num.toString();
    next();
});

const HOSPITAL = mongoose.model("HOSPITAL", hospitalSchema);

module.exports = HOSPITAL