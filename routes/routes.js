import express from 'express'
import login from '../controllers/login.js';
import register from '../controllers/register.js';
import ChatsController from '../controllers/chats-controller.js';
import auth from '../controllers/auth.js'

const router = express.Router()
router.post('/reg', register);
router.post('/login', login);
router.post('/auth', auth);
router.get('/get_chats', ChatsController.getChats)
router.post('/create-chat', ChatsController.createChat)
export default router