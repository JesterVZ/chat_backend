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
        db.query('SELECT email FROM `users` WHERE email = ?', [body.email], async(err, result) => { //проверка по email
            if(err){
                returnData(res, 300, err, null);
            }
            if(result[0]){
                returnData(res, 300, "Пользователь с таким email уже зарегестрирован", null);
            } else {
                db.query('SELECT login FROM `users` WHERE login = ?', [body.login], async(err, result) => { //проверка по Login
                    if(err){
                        returnData(res, 300, err, null);
                    }
                    if(result[0]){
                        returnData(res, 300, "Пользователь с таким логином уже зарегестрирован", null);
                    } else {
                        bcrypt.hash(body.password, 10, (err, hash) => {
                            if(err){
                                returnData(res, 300, err, null);
                            }
                            db.query('INSERT INTO `users` SET ?', {
                                login: body.login,
                                nickname: body.nickname,
                                email: body.email, 
                                password: hash, 
                                phone: body.phone, 
                                country: body.country, 
                                city: body.city
                            }, (error, result) => {
                                if(error){
                                    returnData(res, 300, error, null);
                                } else {
                                    returnData(res, 200, null, "Регистрация прошла успешно!");
                                }
            
                            });
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