const LOCATIONTRACKING = require("./../models/locationTrackingModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// Responses
exports.getAllLocationTracker = catchAsync ( async  (req, res) => {
    const locationTracker = await LOCATIONTRACKING.find();

    res.status(200).json({
        status: "success",
        results: locationTracker.length,
        data: {
            locationTracker,
        }
    });
});

exports.createLocationTracker = catchAsync ( async  (req, res) => {
    const locationTracker = await LOCATIONTRACKING.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            locationTracker
        }
    });
});

exports.getSingleLocationTracker = catchAsync ( async  (req, res) => {
    const locationTracker = await LOCATIONTRACKING.findById(req.params.id);

    if(!newManifest) {
        return next(new AppError('No Tracker found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        data: {
            locationTracker,
        }
    });
});

exports.updateLocationTracker = catchAsync ( async  (req, res) => {
    const locationTracker = await LOCATIONTRACKING.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!newManifest) {
        return next(new AppError('No Tracker found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        data: {
            locationTracker,
        }
    });
});

exports.deleteSingleLocationTracker = catchAsync ( async  (req, res) => {
    const locationTracker = await LOCATIONTRACKING.findByIdAndDelete(req.params.id);

    if(!newManifest) {
        return next(new AppError('No Tracker found with that ID'), 404)
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});