import Joi from "joi";

export const employeeSchema = Joi.object({
    id: Joi.number().integer().positive().optional().allow(null).messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number'
    }),
    first_name: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name must be at most 100 characters long'
    }),
    last_name: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name must be at most 100 characters long'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.pattern.base': 'Mobile number must be a 10-digit number'
    }),
    address: Joi.string().max(255).required().messages({
        'string.empty': 'Address is required',
        'string.max': 'Address must be at most 255 characters long'
    }),
    department_id: Joi.number().integer().required().messages({
        'number.base': 'Department ID must be a number',
        'number.integer': 'Department ID must be an integer'
    })
});
