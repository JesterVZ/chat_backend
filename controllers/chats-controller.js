import db from "../routes/db-config.js"
var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}
class ChatsController{
    
    async getChats(req, res){
        var body = req.body;
        db.query('SELECT * FROM `chat_users` WHERE user_id = ?', [parseInt(body.user_id)], async(err, result) => {
            if(err){
                return returnData(res, 300, err, null);
            }
            return returnData(res, 200, null, result);
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
                                return returnData(res, 300, error, null);
                            }else {
                                resolve(result_users);
                            }
                            
                        })
                    })
                });
                return returnData(res, 200, null, "Чат успешно создан!");
            }
        })
    }
    async getMessages(req, res){
        var body = req.body;
        db.query('SELECT * FROM `messages` WHERE user_id = ?', [parseInt(body.user_id)], async(err, result) => {
            if(err){
                return returnData(res, 300, err, null);
            }
            return returnData(res, 200, null, result);
        });
    }
    async sendMessage(req, res){
        var body = req.body;
        var currentdate = new Date(); 
        const isoDate = new Date(currentdate);
        db.query('INSERT INTO `messages` SET ?', {
            user_id: body.user_id,
            chat_id: body.chat_id,
            message_text: body.message,
            date_added: isoDate
        }, (error, result) => {
            if(error){
                return returnData(res, 300, error, null);
            } else {
                return returnData(res, 200, null, result);
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

export default new ChatsController();