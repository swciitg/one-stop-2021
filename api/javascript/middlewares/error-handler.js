exports.errorHandler = (err,req,res,next) => {
    if(err instanceof Error){
        res.status(500).json({"message" : "Internal Server Error","error" : err.message});
    }
    else{
        res.status(err.statusCode).json({"message" : "some error occured","error" : err.message});
    }
}