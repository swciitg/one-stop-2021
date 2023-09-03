const { CustomError } = require("./custom.error");

exports.UserBlockedError = class UserBlockedError extends CustomError{
    constructor(message){
        super(message,418,"Blocked user request error");
    }
}