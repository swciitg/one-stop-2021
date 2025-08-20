import { CustomError } from "../errors/custom.error.js";

export const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({"message" : err.message,"error" : err.name});
    }
    else{
        return res.status(500).json({"message" : err.message,"error" : "Internal Server Error"});
    }
}