const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
    const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
    const message = `Duplicate field values ${value}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${error.join(". ")}`;
    return new AppError(message, 400);
};

const handleJWTError = () => {
    const message = `Invalid token. Please login again`;
    return new AppError(message, 401);
};

const handleTokenExpiredError = () => {
    const message = `Your token has expired. Please login again`;
    return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
};

const sendErrorPro = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong"
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.statusCode || "error";

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        if (error.name === "CastError")  error = handleCastErrorDB(error);
        if (error.code === 11000)  error = handleDuplicateFieldDB(error);
        if (error.name === "ValidationError")  error = handleValidationError(error);
        if (error.name === "JsonWebTokenError")  error = handleJWTError();
        if (error.name === "TokenExpiredError")  error = handleTokenExpiredError();
        sendErrorPro(error, res);
    }
    next();
}