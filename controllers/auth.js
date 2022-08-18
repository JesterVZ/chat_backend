import express from "express"
import register from "./register.js"
import login from "./loggedin.js"
import logout from "./logout.js"
const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router