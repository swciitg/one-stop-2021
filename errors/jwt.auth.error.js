import { CustomError } from "./custom.error.js";

export class AccessTokenError extends CustomError {
    constructor(message) {
        super(message, 401, "Access token error");
    }
}

export class RefreshTokenError extends CustomError {
    constructor(message) {
        super(message, 401, "Refresh token error");
    }
}