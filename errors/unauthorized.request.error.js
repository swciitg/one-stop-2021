import { CustomError } from "./custom.error.js";

export class UnauthorizedRequestError extends CustomError {
    constructor(message) {
        super(message, 403, "Forbidden");
    }
}