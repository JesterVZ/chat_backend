import db from "../routes/db-config.js"
var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}
class ChatsController{
    
    async getChats(req, res){
        var body = req.body;
        db.query('SELECT * FROM `chat_users` WHERE user_id = ?', [parseInt(body.user_id)], async(err, result) => { //
            if(err){
                return returnData(res, 300, err, null);
            }
            res.statusCode = 200;
            responseData["status-code"]=res.statusCode;
            responseData["error"]=null;
            responseData["data"] = result;
            return res.json(responseData);
        })
    }
    async createChat(req, res){ // работает, но не более 2-х, так как Cannot set headers after they are sent to the client
        var body = req.body;
        db.query('INSERT INTO `chats` SET ?', {
            name: body.name,
            type: body.type
        }, (error, result) => {
            if(error){
                return returnData(res, 300, error, null);
            } else {
                const chatId = result.insertId;
                body.user_id.forEach(async (element) => {
                    return new Promise((resolve, reject) => {
                        db.query('INSERT INTO `chat_users` SET ?', {
                            chat_id: chatId,
                            user_id: element
                        }, (error, result_users) => {
                            if(error){
                                
                                returnData(res, 300, error, null);
                            }else {
                                resolve(result_users);
                            }
                            
                        })
                    })
                });
                /*
                for(var i = 0; i < body.user_id.length; i++){
                    db.query('INSERT INTO `chat_users` SET ?', {
                        chat_id: chatId,
                        user_id: body.user_id[i]
                    }, (error, result_users) => {
                        if(error){
                            
                            returnData(res, 300, error, null);
                        }
                    })
                    console.log(result_users);
                }
                */
                //returnData(res, 200, null, "Чат успешно создан!");
                return returnData(res, 200, null, "Чат успешно создан!");
            }
        })
    }
    async getMessages(req, res){

    }
    async sendMessage(req, res){

    }
}

function returnData(res, codeResult, error, data){
    res.statusCode = codeResult;
    responseData["status-code"]=res.statusCode;
    responseData["error"]=error;
    responseData["data"] = data;
    return res.json(responseData);
}

export default new ChatsController();