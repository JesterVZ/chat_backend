import jwt from "jsonwebtoken";

var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }
            res.statusCode = 200;
            responseData["status-code"]=res.statusCode;
            responseData["error"]=null;
            responseData["data"] = user;
            return res.json(responseData);
        });
    } else {
        res.sendStatus(401);
    }
}

export default authJWT