class RequestValidationError extends Error{
    constructor(message){
        super(message);
        this.name = "400 Bad request error";
    }
}