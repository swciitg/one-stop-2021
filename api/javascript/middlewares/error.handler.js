const { CustomError } = require("../errors/custom.error");

exports.errorHandler = (err,req,res,next) => {
    console.log("here");
    if(err instanceof CustomError){
        res.status(err.statusCode).json({"message" : err.name,"error" : err.message});
    }
    else{
        res.status(500).json({"message" : "Internal Server Error","error" : err.message});
    }
}