const MANIFEST = require("./../models/manifestModels");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

// Responses
// exports.getAllManifest = catchAsync ( async  (req, res) => {
//     const manifests = await MANIFEST.find();

//     res.status(200).json({
//         status: "success",
//         // requestTime: req.requestTime,
//         results: manifests.length,
//         manifests: manifests
//     });
// });

exports.createManifest = catchAsync ( async  (req, res) => {
    const manifests = await MANIFEST.create(req.body);

    res.status(201).json({
        status: "success",
        manifests: manifests
    });
});

exports.getSingleManifest = catchAsync ( async  (req, res) => {
    const manifests = await MANIFEST.findById(req.params.id);

    if(!manifests) {
        return next(new AppError('No Manifest found with that ID'), 404)
    }
    
    res.status(200).json({
        status: "success",
        manifests: manifests
    });
});

exports.getManifestbyRequisionId = catchAsync ( async  (req, res, next) => {
    // console.log('getManifestbyRequisionId');
    // console.log(req.query);
    const features =  new APIFeatures(MANIFEST.find(), req.query)
    .filter().sort();
    const manifests = await features.query;
    console.log(manifests);
    console.log(manifests.length);
    res.status(200).json({
        status: "success",
        results: manifests.length,
        manifests: manifests
    });
});

exports.updateManifest = catchAsync ( async  (req, res) => {
    const manifests = await MANIFEST.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!manifests) {
        return next(new AppError('No Manifest found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        manifests: manifests
    });
});

exports.deleteSingleManifest = catchAsync ( async  (req, res) => {
    const manifests = await MANIFEST.findByIdAndDelete(req.params.id);

    if(!manifests) {
        return next(new AppError('No Manifest found with that ID'), 404)
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getManifestPie = catchAsync ( async (req, res, next) => {
    const year = req.params.year * 1;
    
    const plan = await MANIFEST.aggregate([
        {
            $unwind: "$created_date",
        },
        {
            $match: {
                created_date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $week: "$created_date" },

            }
        },
        {
            $addFields: {
                week: "$_id"
            }
        },
        {
            $project: {
                $_id: 0,
            }
        }
    ]);
    res.status(200).json({
        status: "success",
        data: plan
    });
});