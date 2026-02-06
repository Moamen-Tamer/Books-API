import express from 'express';
import {
    register,
    login,
    logout,
    authStatus,
    validateRegister,
    validateLogin,
    refresh
} from '../controllers/authControllers.js';
import { authenticateToken } from '../middlewares/authentication.js';

const auth = express.Router();

auth.post('/register', validateRegister, register);
auth.post('/login', validateLogin, login);
auth.post('/logout', authenticateToken, logout);
auth.post('/refresh', refresh);
auth.get('/me', authenticateToken, authStatus)

export default auth;