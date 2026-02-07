import Joi from "joi";

export const departmentSchema = Joi.object({
    id: Joi.number().integer().positive().optional().allow(null).messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number'
    }),

    department: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Department name is required',
        'string.min': 'Department name must be at least 2 characters long',
        'string.max': 'Department name must be at most 100 characters long'
    }),

    is_active: Joi.when('id', {
        is: Joi.number().integer().positive(),
        then: Joi.string().valid('0', '1').required().messages({
            'string.empty': 'is_active is required while updating a department',
            'any.only': 'is_active must be either "0" (inactive) or "1" (active)'
        }),
        otherwise: Joi.string().valid('0', '1').optional().messages({
            'any.only': 'is_active must be either "0" (inactive) or "1" (active)'
        })
    })
});
