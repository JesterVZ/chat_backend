import express from "express"
import db from "./routes/db-config.js"
import router from "./routes/routes.js"
const app = express();
const PORT = 3000;

app.use(express.json())
db.connect((err) => {
    if(err) throw err;
    console.log("Database connected");
})
app.use("/api", router)
app.listen(PORT)