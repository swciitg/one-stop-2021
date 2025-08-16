import jwt from "jsonwebtoken";
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;

export const gcScoreboardAuthMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("No Token Found");
        }
        let token = req.headers.authorization.split(' ').slice(-1)[0];
        let decoded = jwt.verify(token, accessjwtsecret);
        if (decoded["email"] !== undefined) {
            req.body.email = decoded["email"];
            console.log(req.body.email);
            next();
        }
        else throw new Error("Token Expired or not Valid");
    }
    catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}