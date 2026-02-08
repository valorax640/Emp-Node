import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../utils/message.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: false,
            message: ERROR_MESSAGES.INVALID_TOKEN,
            data: {}
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(401).json({
            status: false,
            message: ERROR_MESSAGES.INVALID_TOKEN,
            data: {}
        });
    }
};