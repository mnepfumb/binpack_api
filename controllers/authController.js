const USER = require("./../models/usersModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils');



exports.signup = catchAsync ( async (req, res) => {
    const newUser = USER.create(req.body);
    // const newUser = USER.create({
    //     name: req.body.name
    // });

    const accessTokenPayload = {
        user_id:newUser._id,
        role:newUser.role
    }

    const token = generateAccessToken(accessTokenPayload);

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

    // console.log(email);
    // console.log(password);

    if (!email || !password) {
        next(new AppError("Please provide your email and password", ))
    }
    const user = await USER.findOne({email}).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next( new AppError("Incorrect email or password", 401));
    }

    const accessTokenPayload = { user_id:user._id, role:user.role }
    // console.log(user._id);

    const accessToken = generateAccessToken(accessTokenPayload);
    const refreshToken = generateRefreshToken(accessTokenPayload);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none', // Adjust based on your security needs
        secure: true, // Ensure secure is true in production
      });
    console.log("accessToken: "+accessToken);

    res.status(200).json({
        status: "Success",
        accessToken,
        // data: user._id,
        user: user

    });
});

exports.verifyAccessToken = catchAsync ( async (req, res, next) => {
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
    // // check token
    // let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //     token = req.headers.authorization.split(" ")[1];
    // }

    // console.log("token: "+token);

    // if (!token) {
    //     return next(new AppError("You are not logged in to get access", 401));
    // }
    // // validate token
    // try {
    //     // Verify token and decode payload
    //     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //     // var decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     console.log("decoded: "+decoded?.payload?.user_id);

    //     // Check if user exists in database
    //     const user = await USER.findById(decoded?.payload?.user_id);

    //     console.log("user: "+user);

    //     if (!user) {
    //         return next(new AppError("The user belonging to this token does not exist", 401));
    //     }

    //     // Check if user changed password after token was issued
    //     user.changePasswordAfter(decoded.iat);

    //     // Attach user object to request object for further middleware to use
    //     req.user = user;

    //     console.log("decoded: ", decoded); // Log the entire decoded object

    //     next();
    // } catch (err) {
    //     console.error('JWT verification error:', err);
    //     return next(new AppError("Invalid token. Please log in again", 401));
    // }
});


exports.verifyRefreshToken = catchAsync ( async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new AppError('Refresh token is missing', 401));
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Invalid refresh token', 401));
    }
    req.user = decoded.user;
    next();
  });

});