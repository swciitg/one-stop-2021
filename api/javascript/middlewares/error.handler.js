const { CustomError } = require("../errors/custom.error");

exports.errorHandler = (err,req,res,next) => {
    console.log("here");
    if(err instanceof CustomError){
        res.status(err.statusCode).json({"message" : err.message,"error" : err.name});
    }
    else{
        res.status(500).json({"message" : err.message,"error" : "Internal Server Error"});
    }
}