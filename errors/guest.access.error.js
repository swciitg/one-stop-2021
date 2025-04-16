import { CustomError } from "./custom.error.js";

export class GuestAccessError extends CustomError {
    constructor(message) {
        super(message, 403, "Guest Access Error");
    }
}