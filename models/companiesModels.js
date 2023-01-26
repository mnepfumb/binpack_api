const mongoose = require("mongoose");
const serial = require("generate-serial-key");

const companySchema = new mongoose.Schema({
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
    company_id: {
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

companySchema.pre("save", function (next) {
    var serial_num = serial.generate();
    console.log(serial_num);
    this.company_id = serial_num.toString();
    next();
});

const COMPANIES = mongoose.model("COMPANIES", companySchema);

module.exports = COMPANIES