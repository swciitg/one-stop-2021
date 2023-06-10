const { validationResult } = require("express-validator");

exports.requestValidation = (req,res,next) => {
    console.log("in req val");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array().toString());
    }
    next();
}