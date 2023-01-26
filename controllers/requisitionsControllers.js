const REQUISITION = require("./../models/requisitionsModels");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


exports.getAllRequisition = catchAsync ( async  () => {
    console.log('getAllRequisition');
    // console.log(req.query);
    // const features = new APIFeatures(REQUISITION.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .pagination();

    // const requisition = await features.query;
    const requisition = await REQUISITION.find();
    console.log(requisition.length);

    res.status(200).json({
        status: "success",
        results: requisition.length,
        data: {
            requisition,
        }
    });
});

exports.createRequisition = catchAsync ( async  (req, res, next) => {
    const requisition = await REQUISITION.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            requisition
        }
    });
});

exports.getSingleRequisition = catchAsync ( async  (req, res, next) => {
    console.log('getSingleRequisition');
    const requisition = await REQUISITION.findById(req.params.id);

    if(!requisition) {
        return next(new AppError('No Requisition found with that ID'), 404)
    }

    res.status(200).json({
        status: "success",
        data: {
            requisition,
        }
    });
});

exports.getRequisitionByCompany = catchAsync ( async  (req, res, next) => {
    console.log('getRequisitionByCompany');
    console.log('query ${req.query}');
    // const requisition_list;
    const features =  new APIFeatures(REQUISITION.find(), req.query).filter().sort();
    // console.log(features);
    const requisition = await features.query;
    // // const requisition = await REQUISITION.find().filter();
    // console.log(requisition);
    console.log(requisition.length);
    // console.log(requisition);
    res.status(200).json({
        status: "success",
        results: requisition.length,
        data: {
            requisition,
        }
    });
});

exports.updateRequisition = catchAsync ( async  (req, res, next) => {
    console.log('updateRequisition');
    console.log(req.params.id);
    const requisition = await REQUISITION.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!requisition) {
        return next(new AppError('No Requisition found with that ID'), 404)
    }
    
    res.status(200).json({
        status: "success",
        data: {
            requisition,
        }
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
                
                // $count : {createManifest}
                // 'createManifest' : {
                //     // '$sum' : '$createManifest'
                //     // count: { $sum: 1 }
                // }
                // '$week' : '$created_date',
                // '$sum' : '$createManifest'

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

