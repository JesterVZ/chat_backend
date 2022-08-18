import jwt from "jsonwebtoken";
import db from "../routes/db-config.js"
import bcrypt from "bcryptjs"
var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}
const login = async (req, res) => {
    var body = req.body;
    if(!body.login || !body.password){
        console.log(body);
        return returnData(res, 300, "Введите логин, email или пароль", null);
    } else {
        db.query('SELECT login FROM `users` WHERE login = ?', [body.login], async(err, result) => {
            if(err){
                returnData(res, 300, err, null);
            }
            var a = !await bcrypt.compare(body.password, result[0].password)

            returnData(res, 200, null, a);
        })
    }
}

function returnData(res, codeResult, error, data){
    res.statusCode = codeResult;
    responseData["status-code"]=res.statusCode;
    responseData["error"]=error;
    responseData["data"] = data;
    return res.json(responseData);
}


export default login