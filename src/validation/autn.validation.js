import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': "Email is required",
        'string.email': "Email must be a valid email"
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': "Password is required",
        'string.min': "Password must be at least 6 characters long"
    })
});

export const registerSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required().messages({
        'string.empty': "First name is required",
        'string.min': "First name must be at least 2 characters long",
        'string.max': "First name must be at most 50 characters long"
    }),

    last_name: Joi.string().min(2).max(50).required().messages({
        'string.empty': "Last name is required",
        'string.min': "Last name must be at least 2 characters long",
        'string.max': "Last name must be at most 50 characters long"
    }),

    email: Joi.string().email().required().messages({
        'string.empty': "Email is required",
        'string.email': "Email must be a valid email"
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': "Password is required",
        'string.min': "Password must be at least 6 characters long"
    })
});
