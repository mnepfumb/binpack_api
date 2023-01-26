const mongoose = require("mongoose");
const validator = require("validator");
const serial = require("generate-serial-key");

const requisitionSchema = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: [true, "Please provide company"]
    }, 
    wasteType: {
        type: String,
        required: [true, "Please provide waste type"],
        // enum: {
        //     values: ["Assigned to Driver", "Awaiting Acceptance", "En Route to Landfill", "En Route to Recycling Depot", "En Route to Scrapyard", "En Route to Sorting", "Handed Over", "Sorting Facility", "Waste Collected", "Waste Disposed", "Waste Diverted"],
        //     message: "Please select from the provided options."
        // }
    },  
    details: {
        type: String,
        maxlength: [120, "You are limited to 120 characters"]
    },
    hospitalId: {
        type: String
    }, 
    hospitalName: {
        type: String
    }, 
    serviceProviderId: {
        type: String
    }, 
    user_id: {
        type: String
    }, 
    serviceProviderId: {
        type: String
    },  
    driver_id: {
        type: String
    },
    created_date: {
        type: String,
        default: Date.now().toString(),
        // select: false //hides this information permanently
    },  
    updated_at: {
        type: String
    },
    status: {
        type: String,
        required: [true, "Please provide status"]
    },
    percentage: {
        type: Number
    },
    collection_Date: String,
    collection_address: {
        type: String
    },
    createManifest: {
        type: Boolean,
        default: false
    },
    bin_location: {
        type: String
    }, 
    expected_qty: {
        type: Number,
        default: 0,
    },
    requision_id: {
        type: String
    }
});

// requisitionSchema.pre("save", function (next) {
//     this.slug = slugify(this.company, {lower: true});
//     next();
// });
// requisitionSchema.pre("find", function (next) {
//     this.pipeline().unshift({})
//     next();
// });

requisitionSchema.pre("save", function (next) {
    this.requision_id = serial.generate();
    next();
});
const REQUISITION = mongoose.model("REQUISITION", requisitionSchema);

module.exports = REQUISITION