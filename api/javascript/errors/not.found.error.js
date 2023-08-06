const { CustomError } = require("./custom.error");

exports.NotFoundError = class NotFoundError extends CustomError{
    constructor(message){
        super(message,404,"Not Found Error");
    }
}