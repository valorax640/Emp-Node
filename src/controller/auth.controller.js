import { createUser, authenticateUser, checkEmailExists } from "../model/auth.model.js";
import { generateToken } from "../utils/jwt.js";
import { loginSchema, registerSchema } from "../validation/autn.validation.js";
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/message.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }

    try {
        const user = await authenticateUser(email, password);
        if (user) {
            const token = generateToken(user);
            res.status(200).json({
                status: true,
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                data: {
                    user: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role_id: user.role_id
                    },
                    token
                },
            });
        } else {
            res.status(401).json({
                status: false,
                message: ERROR_MESSAGES.INVALID_CREDENTIALS,
                data: {}
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const { error } = registerSchema.validate({ first_name, last_name, email, password });
    if (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }

    try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                status: false,
                message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
                data: {}
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(first_name, last_name, email, hashedPassword);
        res.status(201).json({
            status: true,
            message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
            data: { userId }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};