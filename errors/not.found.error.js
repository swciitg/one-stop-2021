import { CustomError } from "./custom.error.js";

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404, "Not Found Error");
    }
}