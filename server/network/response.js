const config = require("../config");

exports.success = function (req, res, body, message = "", status = 200) {
    res.status(status).json({
        error: false,
        body,
        status,
        message,
    });
};

exports.error = function (req, res, err = {}) {
    if (config.dev) {
        console.log(err);
    } else {
        delete err.stack;
        console.log(err);
    }

    const status = err.status || 500;

    res.status(status).json({
        error: true,
        ...err,
    });
};
