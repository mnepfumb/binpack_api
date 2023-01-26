const mongoose = require("mongoose");

const manifestSchema = new mongoose.Schema({
    company_name: {
        type: String,
    }, 
    wasteType: {
        type: String
    },
    waste_generator_id: {
        type: String
    }, 
    user_id: {
        type: String
    }, 
    created_date: {
        type: String,
    },  
    updated_at: {
        type: String
    },  
    requisition_id: {
        type: String
    },
    status: {
        type: String
    },
    driver_id: {
        type: String
    },
    expected_qty: {
        type: Number
    }, 
    operator_in: {
        type: String
    }, 
    operator_out: {
        type: String
    }, 
    operator_name: {
        type: String
    }, 
    landfill: {
        type: String
    },
    notes: {
        type: String
    }, 
    time_in: {
        type: String
    }, 
    time_out: {
        type: String
    }, 
    treatment: {
        type: String
    }, 
    bin_location: {
        type: String
    },
    bin_qty: {
        type: Number
    }, 
    bin_size: {
        type: Number
    }, 
    waste_mass: {
        type: Number
    },
    wasteCollected: {
        type: Boolean
    }, 
    wasteDiverted: {
        type: Boolean
    }, 
    wasteDisposed: {
        type: Boolean
    },
});

const MANIFEST = mongoose.model("MANIFEST", manifestSchema);

module.exports = MANIFEST