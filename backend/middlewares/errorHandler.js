const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ||  500;
    const message = err.message || "Error interno en el servidor";

    console.error({statusCode, message, stack: err.stack});

    res.status(statusCode).json({error: message});
};

module.exports = errorHandler;