import db from "../routes/db-config.js"
import bcrypt from "bcryptjs"
var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}
const register = async(req, res) => {
    var body = req.body;
    console.log(req.body);
    if(body.password == null || body.password == ""){
        res.statusCode = 300;
        responseData["status-code"]=res.statusCode;
        responseData["error"]="Введите пароль";
        return res.json(responseData);
    } else {
        db.query('SELECT email FROM `users` WHERE email = ?', [body.email], async(err, result) => {
            if(err){
                returnData(res, 300, err, null);
            }
            if(result[0]){
                returnData(res, 300, "Пользователь с таким email уже зарегестрирован", null);
            } else {
                db.query('SELECT login FROM `users` WHERE login = ?', [body.login], async(err, result) => {
                    if(err){
                        returnData(res, 300, err, null);
                    }
                    if(result[0]){
                        returnData(res, 300, "Пользователь с таким логином уже зарегестрирован", null);
                    } else {
                        const hashedPassword = bcrypt.hash(body.password, 8);
                        db.query('INSERT INTO `users` SET ?', {login: body.login, email: body.email, password: hashedPassword, phone: body.phone, country: body.country, city: body.city}, (error, result) => {
                            if(error){
                                returnData(res, 300, err, null);
                            } else {
                                returnData(res, 200, null, "Регистрация прошла успешно!");
                            }
        
                        });
                    }
                })
            }
        });
    }
}

function returnData(res, codeResult, error, data){
    res.statusCode = codeResult;
    responseData["status-code"]=res.statusCode;
    responseData["error"]=error;
    responseData["data"] = data;
    return res.json(responseData);
}


export default register