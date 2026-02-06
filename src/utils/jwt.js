import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ debug: false, override: false, quiet: true });

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, first_name: user.first_name, last_name: user.last_name, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}