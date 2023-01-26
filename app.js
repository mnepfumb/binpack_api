const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const usersRouter = require("./routes/usersRouter");
const requisitionsRouter = require("./routes/requisitionsRouter");
const companyRouter = require("./routes/companiesRouter");
const hospitalRouter = require("./routes/hospitalRouter");
const manifestRouter = require("./routes/manifestRouter");
const locationTrackingRouter = require("./routes/locationTrackingRouter");
const requisitionStatusRouter = require("./routes/requisitionStatusRouter");
const wasteTypesRouter = require("./routes/wasteTypesRouter");

const app = express();
// app.use(express.json());
app.use(morgan("dev"))



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MIDDLE WARE
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
    // if (req.method === 'OPTION') {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        // return res.status(200).json({});
    // }
    next();
});

app.use((req,res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/requisition", requisitionsRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/hospital", hospitalRouter);
app.use("/api/v1/manifest", manifestRouter);
app.use("/api/v1/locationTracking", locationTrackingRouter);
app.use("/api/v1/requisitionStatus", requisitionStatusRouter);
app.use("/api/v1/wasteTypes", wasteTypesRouter);

app.all("*", (req, res, next) => {
    
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
});

app.use(globalErrorHandler);

module.exports = app;