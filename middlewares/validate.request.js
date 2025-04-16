import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request.validation.error.js";

export const requestValidation = (req, res, next) => {
    console.log("in req val");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new RequestValidationError(errors.errors[0].msg);
    }
    next();
}