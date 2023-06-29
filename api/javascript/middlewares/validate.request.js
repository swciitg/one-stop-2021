const { validationResult } = require("express-validator");
const { RequestValidationError } = require("../errors/request.validation.error");

exports.requestValidation = (req,res,next) => {
    console.log("in req val");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new RequestValidationError(errors.toString());
    }
    next();
}