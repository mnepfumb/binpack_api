const REQUISITIONSTATUS = require("./../models/requisitionStatusModels");
const catchAsync = require("./../utils/catchAsync");

exports.getAllRequisitionStatus = catchAsync ( async  (req, res) => {
    const newRequisitionStatus = await REQUISITIONSTATUS.find();

    res.status(200).json({
        status: "success",
        results: newRequisitionStatus.length,
        data: {
            newRequisitionStatus,
        }
    });
});

exports.createRequisitionStatus = catchAsync ( async  (req, res) => {
    const newRequisitionStatus = await REQUISITIONSTATUS.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newRequisitionStatus
        }
    });
});

exports.getSingleRequisitionStatus = catchAsync ( async  (req, res) => {
    const newRequisitionStatus = await REQUISITIONSTATUS.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            newRequisitionStatus,
        }
    });
});

exports.updateRequisitionStatus = catchAsync ( async  (req, res) => {
    const newRequisitionStatus = await REQUISITIONSTATUS.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            newRequisitionStatus,
        }
    });
});

exports.deleteSingleRequisitionStatus = catchAsync ( async  (req, res) => {
    const newRequisitionStatus = await REQUISITIONSTATUS.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        data: null
    });
});