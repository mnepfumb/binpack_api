const REQUISITION = require("./../models/requisitionsModels");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


exports.getAllRequisition = catchAsync ( async  (req, res, next) => {
    console.log('getAllRequisition');
    console.log(req.query);
    // const features = new APIFeatures(REQUISITION.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .pagination();

    // const requisition = await features.query;
    const requisitions = await REQUISITION.find();
    console.log(requisitions.length);
    console.log(requisitions);

    if (!requisitions) {
        return next(new AppError('No requisitions found', 404));
    }

    res.status(200).json({
        status: "success",
        requisitions: requisitions,
    });
});

exports.createRequisition = catchAsync ( async  (req, res, next) => {
    const requisitions = await REQUISITION.create(req.body);
    res.status(201).json({
        status: "success",
        requisitions: requisitions,
    });
});

exports.getSingleRequisition = catchAsync ( async  (req, res, next) => {
    console.log('getSingleRequisition');
    const requisitions = await REQUISITION.findById(req.params.id);

    if(!requisitions) {
        return next(new AppError('No Requisition found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        requisitions: requisitions,
    });
});

exports.getRequisitionByCompany = catchAsync ( async  (req, res, next) => {
    console.log('getRequisitionByCompany');
    console.log('query ${req.query}');
    // const requisition_list;
    const features =  new APIFeatures(REQUISITION.find(), req.query).filter().sort();
    // console.log(features);
    const requisitions = await features.query;
    // // const requisition = await REQUISITION.find().filter();
    // console.log(requisition);
    console.log(requisitions.length);
    // console.log(requisition);
    res.status(200).json({
        status: "success",
        results: requisitions.length,
        requisitions: requisitions,
    });
});

exports.updateRequisition = catchAsync ( async  (req, res, next) => {
    console.log('updateRequisition');
    console.log(req.params.id);
    const requisitions = await REQUISITION.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!requisitions) {
        return next(new AppError('No Requisition found with that ID'), 404)
    }
    
    res.status(200).json({
        status: "success",
        requisitions: requisitions,
    });
});

exports.deleteSingleRequisition = catchAsync ( async  (req, res, next) => {
    const requisition = await REQUISITION.findByIdAndDelete(req.params.id);

    if(!requisition) {
        return next(new AppError('No Requisition found with that ID'), 404)
    }
    
    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getRequisitionStats = catchAsync ( async (req, res, next) => {
    const stats = await REQUISITION.aggregate([
        {
            '$match': {
                'created_date' : {
                    '$gt' : '2021'
                }

            }
            // Date(`${created_date}`),
        },
        {
            '$group' : {
                '_id' : {'created_date': '$created_date'},
                'wasteType' : { '$sum' : 1},
                'createManifest' : { '$sum' : 1},

            }
        },
    ]).exec((err, stats) => {
        if (err) {
            res.status(404).json(err);
        } 

        if (stats) {
            res.status(200).json({
                status: "success",
                data: stats
            });
        }
    });
    
     
});

// exports.getRequisitionPlan = catchAsync ( async (req, res, next) => {
//     const year = req.params.year * 1;
//     console.log(year);
//     const plan = await REQUISITION.aggregate([
//         {
//             $unwind: "$created_date",
//         },
//         {
//             $match: {
//                 created_date: {
//                     $gte: new Date(`${year}-01-01`),
//                     $lte: new Date(`${year}-12-31`),
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: { $week: "$created_date" },

//             }
//         },
//         {
//             $addFields: {
//                 week: "$_id"
//             }
//         },
//         {
//             $project: {
//                 $_id: 0,
//             }
//         }
//     ]);
//     res.status(200).json({
//         status: "success",
//         data: plan
//     });
// });

