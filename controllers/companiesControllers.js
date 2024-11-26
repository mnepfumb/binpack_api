const COMPANIES = require("./../models/companiesModels");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

// Responses
exports.getAllCompany = catchAsync ( async  (req, res) => {
    // const features = new APIFeatures(COMPANIES.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .pagination();

    // const company = await features.query;
    const company = await COMPANIES.find();
    res.status(200).json({
        status: "success",
        // requestTime: req.requestTime,
        results: company.length,
        company: company
    });
});

exports.createCompany = catchAsync ( async  (req, res) => {
    const company = await COMPANIES.create(req.body);
    res.status(201).json({
        status: "success",
        company: company
    });
});

exports.getSingleCompany = catchAsync ( async  (req, res) => {
    const company = await COMPANIES.findById(req.params.id);
    res.status(200).json({
        status: "success",
        company: company
    });
});

exports.updateCompany = catchAsync ( async  (req, res) => {
    const company = await COMPANIES.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        company: company
    });
});

exports.deleteSingleCompany = catchAsync ( async  (req, res) => {
    const company = await COMPANIES.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null
    });
});