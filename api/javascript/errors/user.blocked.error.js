const { CustomError } = require("./custom.error");

exports.UserBlockedError = class UserBlockedError extends CustomError{
    constructor(message){
        super(message,403,"Blocked user request error");
    }
}