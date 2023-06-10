const { CustomError } = require("./custom.error");

exports.GuestAccessError = class GuestAccessError extends CustomError{
    constructor(message){
        super(message,403,"Guest Access Error");
    }
}