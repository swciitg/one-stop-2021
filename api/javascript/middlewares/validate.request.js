const { validationResult } = require("express-validator");

exports.requestValidation = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array().toString());
    }
    next();
}