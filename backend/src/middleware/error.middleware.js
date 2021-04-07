const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, _next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : '';

    return res.status(err.status || 500).send({
        statusCode: err.status || 500,
        message: err.stack,
        data: {}
    });
};

export { notFound, errorHandler }
