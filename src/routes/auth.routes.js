import { login, register } from "../controller/auth.controller.js";
import express from 'express';
const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);

export default authRoutes;