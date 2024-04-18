const { CustomError } = require("../errors/custom.error");

exports.errorHandler = (err,req,res,next) => {
    console.log("here in error");
    console.log(err);
    if(err instanceof CustomError){
        console.log("here 1");
        return res.status(err.statusCode).json({"message" : err.message,"error" : err.name});
    }
    else{
        return res.status(500).json({"message" : err.message,"error" : "Internal Server Error"});
    }
}