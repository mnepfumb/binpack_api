const USER = require("./../models/usersModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// CREATE TOKEN
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET ,{ expiresIn: process.env.JWT_EXPIRES });
};

// SIGNUP
exports.signup = catchAsync ( async (req, res) => {
    const newUser = USER.create(req.body);
    // const newUser = USER.create({
    //     name: req.body.name
    // });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: "Success",
        token,
        data: {
            user: newUser,
        }
    });
});

// SIGNIN
exports.signin = catchAsync ( async (req, res, next) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    if (!email || !password) {
        next(new AppError("Please provide your email and password", ))
    }
    const user = await USER.findOne({email}).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next( new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "Success",
        token,
        data: user._id,

    });
});

exports.protect = catchAsync ( async (req, res, next) => {
    // check token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not logged in to get access", 401));
    }
    // validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // user exist
    const userCheck = await USER.findById(decoded.id);
    if (!userCheck) {
        return next( new AppError("The User belonging to this token no longer exist", 401));
    }
    // change password
    userCheck.changePasswordAfter(decoded.iat);
    next();
});