const { CustomError } = require("./custom.error");

exports.GuestAccessError = class GuestAccessError extends CustomError{
    constructor(message){
        super(message,401,"Guest Access Error");
    }
}