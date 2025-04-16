// filepath: /Users/swc/WebDev/one-stop-2021/errors/custom.error.js
export class CustomError extends Error {
    constructor(message, statusCode, name) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
    }
}