const { MongooseError } = require("mongoose");

const tryCatchFunction = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch((error) => {
            if(error instanceof MongooseError)
                error = new DataBaseError();
            next(error);
        });
    }
}

class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends AppError{
    constructor(url){
        super(`The ${url} route does not exists`, 404);
    }
}

class DataBaseError extends AppError{
    constructor(){
        super(`The database could not be reach`, 500);
    }
}

class ValidationError extends AppError{
    constructor(message){
        super(message, 400);
    }
}

module.exports = {NotFoundError, DataBaseError, ValidationError, tryCatchFunction}

