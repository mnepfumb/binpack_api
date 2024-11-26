const HOSPITAL = require("../models/hospitalModels");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

// Responses
exports.getAllHospital = catchAsync ( async  (req, res) => {
    // const features = new APIFeatures(HOSPITAL.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .pagination();

    // const hospital = await features.query;
    const hospital = await HOSPITAL.find();
    res.status(200).json({
        status: "success",
        // requestTime: req.requestTime,
        results: hospital.length,
        hospital: hospital
    });
});

exports.createHospital = catchAsync ( async  (req, res) => {
    const hospital = await HOSPITAL.create(req.body);
    res.status(201).json({
        status: "success",
        hospital: hospital
    });
});

exports.getSingleHospital = catchAsync ( async  (req, res) => {
    const hospital = await HOSPITAL.findById(req.params.id);
    res.status(200).json({
        status: "success",
        hospital: hospital
    });
});

exports.updateHospital = catchAsync ( async  (req, res) => {
    const hospital = await HOSPITAL.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        hospital: hospital
    });
});

exports.deleteSingleHospital = catchAsync ( async  (req, res) => {
    const hospital = await HOSPITAL.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null
    });
});