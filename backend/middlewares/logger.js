const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} -> Status: ${res.statusCode}`);
    });

    next();
};

module.exports = logger;