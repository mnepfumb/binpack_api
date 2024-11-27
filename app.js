const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const requisitionsRouter = require("./routes/requisitionsRouter");
const companyRouter = require("./routes/companiesRouter");
const hospitalRouter = require("./routes/hospitalRouter");
const manifestRouter = require("./routes/manifestRouter");
const locationTrackingRouter = require("./routes/locationTrackingRouter");
const requisitionStatusRouter = require("./routes/requisitionStatusRouter");
const wasteTypesRouter = require("./routes/wasteTypesRouter");
// const dashboardsRouter = require("./routes/dashboardsRouter");

const app = express();
app.use(morgan("dev"));

// Load environment variables
require('dotenv').config();

const corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Credentials": true,
    // origin: process.env.ORIGIN_URL, // Replace with your frontend URL
    // optionsSuccessStatus: 200,  // some legacy browsers (IE11, various SmartTVs) choke on 204
    // "methods": ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    // "preflightContinue": false,
    // credentials: true // This allows the server to accept cookies from the client
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/requisition", requisitionsRouter);
app.use("/company", companyRouter);
app.use("/hospital", hospitalRouter);
app.use("/manifest", manifestRouter);
app.use("/locationTracking", locationTrackingRouter);
app.use("/requisitionStatus", requisitionStatusRouter);
app.use("/wasteTypes", wasteTypesRouter);
// app.use("/dashboards", dashboardsRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
