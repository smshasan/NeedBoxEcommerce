const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    

    //Shows errors in development mode
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack

        })
    }

    //Shows errors in production mode
    if (process.env.NODE_ENV === 'PRODUCTION') {
        
        let error = { ...err }
        
        error.message = err.message

        //Wrong Mongoose object ID error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //Handling Mongoose validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        //Handling Moongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }

        //Handling wrong Jwt error
        if (err.name === 'JsonWebTokenError') {
            const message = `JSON Web Token is invalid. Try again!!! `
            error = new ErrorHandler(message, 400)
        }

        //Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = `JSON Web Token is expired. Try again!!! `
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })   
    }   
}  