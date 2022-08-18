import express from 'express'
import login from '../controllers/login.js';
import register from '../controllers/register.js';

const router = express.Router()
router.post('/reg', register);
router.post('/login', login);
export default router