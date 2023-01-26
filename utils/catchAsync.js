

module.exports = (errFn) => {
    return (req, res, next) => {
        // errFn(req, res, next).catch((err) => next(err));
        errFn(req, res, next).catch(next);
    };
};