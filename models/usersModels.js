const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    }, 
    surname: {
        type: String,
        required: [true, "Please provide surname"]
    }, 
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide as valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm password"],
        validate: {
            validator: function(el) {
                return el == this.password;
            },
            message: "Password is not the same"
        }
    },
    user_type: String,
    passwordChangedAt: Date,
    phone: {
        type: String,
        required: [true, "Please provide a contact number"],
    },
    company: {
        type: String,
    },
    role: {
        type: String,
        required: [true, "Please provide role"]
    },
    // client_id: {
    //     type: String,
    // },
    // sub_client_id: {
    //     type: String
    // },
    company_id: {
        type: String,
    },
    created_date: {
        type:Date,
        default: Date.now(),
    }, 
    updated_at: {
        type: Date
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    has_loggedin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function( candidatePassword, userPassword ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = async function( JWTTimestamp ) {
    if (this.passwordChangedAt) {}
    return false;
};

const USER = mongoose.model("USER", userSchema);

module.exports = USER