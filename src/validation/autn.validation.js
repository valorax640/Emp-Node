import Joi from "joi";
import { VALIDATION_MESSAGES } from "../utils/message.js";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': VALIDATION_MESSAGES.EMAIL_REQUIRED,
        'string.email': VALIDATION_MESSAGES.EMAIL_INVALID
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': VALIDATION_MESSAGES.PASSWORD_REQUIRED,
        'string.min': VALIDATION_MESSAGES.PASSWORD_MIN
    })
});

export const registerSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required().messages({
        'string.empty': VALIDATION_MESSAGES.FIRST_NAME_REQUIRED,
        'string.min': VALIDATION_MESSAGES.FIRST_NAME_MIN,
        'string.max': VALIDATION_MESSAGES.FIRST_NAME_MAX
    }),

    last_name: Joi.string().min(2).max(50).required().messages({
        'string.empty': VALIDATION_MESSAGES.LAST_NAME_REQUIRED,
        'string.min': VALIDATION_MESSAGES.LAST_NAME_MIN,
        'string.max': VALIDATION_MESSAGES.LAST_NAME_MAX
    }),

    email: Joi.string().email().required().messages({
        'string.empty': VALIDATION_MESSAGES.EMAIL_REQUIRED,
        'string.email': VALIDATION_MESSAGES.EMAIL_INVALID
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': VALIDATION_MESSAGES.PASSWORD_REQUIRED,
        'string.min': VALIDATION_MESSAGES.PASSWORD_MIN
    })
});
