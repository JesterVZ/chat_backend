import express from 'express'
import login from '../controllers/login.js';
import register from '../controllers/register.js';
import auth from '../controllers/auth.js'

const router = express.Router()
router.post('/reg', register);
router.post('/login', login);
router.post('/auth', auth);
export default router