import db from "../routes/db-config.js"
var responseData = {
    "status-code": 200,
    "error": null,
    "data": null
}
class ChatsController{
    
    async getChats(req, res){
        var body = req.body;
        db.query('SELECT * FROM `chats` where users = ?', [parseInt(body.user_id)], async(err, result) => { // разобраться с ошибкой запроса
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
    async createChat(req, res){

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