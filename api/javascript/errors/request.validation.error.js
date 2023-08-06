const { CustomError } = require("./custom.error");

exports.RequestValidationError = class RequestValidationError extends CustomError{
    constructor(message){
        super(message,400,"Bad request error");
    }
}
