const USER = require("./../models/usersModels");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

// CREATE TOKEN
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET ,{ expiresIn: process.env.JWT_EXPIRES });
};

exports.getAllUsers = catchAsync ( async  (req, res) => {
    console.log(req.query);
    const features =  new APIFeatures(USER.find(), req.query)
    .filter()
    // .sort()
    // .limitFields()
    // .pagination();
    console.log(features);
    const users = await features.query;
    // const users = await USER.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        users: users
        
    });
});

exports.createUser = catchAsync ( async  (req, res) => {
    const users = await USER.create(req.body);

    res.status(201).json({
        status: "success",
        users: users
    });
});

exports.getSingleUsers = catchAsync ( async  (req, res, next) => {
    // console.log(req);
    const users = await USER.findById(req.params.id);
    console.log(users);

    // if(!users) {
    //     return next(new AppError('No User found with that ID'), 404)
    // }

    res.status(200).json({
        status: "success",
        users: users,
    });
});

exports.updateUsers = catchAsync ( async  (req, res, next) => {
    const users = await USER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!users) {
        return next(new AppError('No User found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        users: users
    });
});

exports.deleteSingleUsers = catchAsync ( async  (req, res, next) => {
    const users = await USER.findByIdAndDelete(req.params.id);

    if(!users) {
        return next(new AppError('No User found with that ID'), 404)
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getUsersStates = catchAsync ( async  (req, res, next) => {
    users = await USER.find();
    console.log(users);
    // count user
    let intenalUsers = 0;
    let extenalUsers = 0;

    
    for (let index = 0; index < users.length; index++) {
        console.log(users[index].user_type);
        if (users[index].user_type === 'Hospital User') {
            ++intenalUsers;
        } else if (users[index].user_type === 'Service Provider') {
            ++extenalUsers;
        }
    }
    res.status(200).json({
        status: "success",
        data : {
            InternalUsers : intenalUsers,
            ExternalUsers : extenalUsers
        }
    });
});