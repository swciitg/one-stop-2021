const { validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors/request.validation.error");

exports.requestValidation = (req,res,next) => {
    console.log("in req val");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.toString());
    }
    next();
}