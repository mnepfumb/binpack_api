const WASTETYPE = require("./../models/wasteTypesModels");
const catchAsync = require("./../utils/catchAsync");

exports.getAllWasteType = catchAsync ( async  (req, res) => {
    const newWasteType = await WASTETYPE.find();

    res.status(200).json({
        status: "success",
        results: newWasteType.length,
        data: {
            newWasteType,
        }
    });
});

exports.createWasteType = catchAsync ( async  (req, res) => {
    const newWasteType = await WASTETYPE.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newWasteType
        }
    });
});

exports.deleteSingleWasteType = catchAsync ( async  (req, res) => {
    const newWasteType = await WASTETYPE.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: "success",
        data: null
    });
});