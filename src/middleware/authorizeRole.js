import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../utils/message.js';

export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: ERROR_MESSAGES.UNAUTHORIZED,
                data: {}
            });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: false,
                    message: ERROR_MESSAGES.FORBIDDEN,
                    data: {}
                });
            }
            if (!allowedRoles.includes(user.role_id)) {
                return res.status(403).json({
                    status: false,
                    message: ERROR_MESSAGES.FORBIDDEN,
                    data: {}
                });
            }
            req.user = user;
            next();
        });
    };
};
