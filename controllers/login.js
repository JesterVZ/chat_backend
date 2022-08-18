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
        db.query('SELECT login FROM `users` WHERE login = ?' [body.login], async(err, result)=>{
            if(err){
                returnData(res, 300, err, null);
            }
            if(!result[0] || !await bcrypt.compare(body.password, result[0].password)){
                returnData(res, 300, "Неверный логин или пароль", null);
            } else {
                const token = jwt.sign({"id": result[0].id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                    httpOnly: true
                })
                const cookieOption = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistrated", token, cookieOption);
                returnData(res, 200, null, "Успешная авторизация!");
            }
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