const { CustomError } = require("./custom.error");

exports.UnauthorizedRequestError = class UnauthorizedRequestError extends CustomError {
    constructor(message) {
        super(message, 403, "Forbidden");
    }
}