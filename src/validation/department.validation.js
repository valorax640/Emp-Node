import Joi from "joi";
import { VALIDATION_MESSAGES } from "../utils/message.js";

export const departmentSchema = Joi.object({
    id: Joi.number().optional(),

    department: Joi.string().min(2).max(100).required().messages({
        'string.empty': VALIDATION_MESSAGES.DEPARTMENT_NAME_REQUIRED,
        'string.min': VALIDATION_MESSAGES.DEPARTMENT_NAME_MIN,
        'string.max': VALIDATION_MESSAGES.DEPARTMENT_NAME_MAX
    }),

    is_active: Joi.when('id', {
        is: Joi.exist(),
        then: Joi.string().valid('0', '1').required(),
        otherwise: Joi.forbidden()
    })
});
