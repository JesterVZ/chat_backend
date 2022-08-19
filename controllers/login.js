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
        db.query('SELECT * FROM `users` WHERE login = ?', [body.login], async(err, result) => {
            if(err){
                returnData(res, 300, err, null);
            }
            if(result[0]){
                console.log(result[0]);
                bcrypt.compare(body.password, result[0].password, (err, compareRes) => {
                    if(err){
                        returnData(res, 300, err, null);
                    }
                    if(compareRes){
                        returnData(res, 200, "Успешно!", null);
                    }
                })
            }else {
                returnData(res, 300, "Неверный логин или пароль", null);
            }
            //bcrypt.compare(body.password, result[0].password)

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