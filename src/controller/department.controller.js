import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/message.js";
import { createDepartment, getDepartments, updateDepartment, getDepartmentById, checkDepartmentExists } from "../model/department.model.js";
import { departmentSchema } from "../validation/department.validation.js";

export const listDepartments = async (req, res) => {
    try {
        const departments = await getDepartments();
        res.status(200).json({
            status: true,
            message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
            data: departments
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const departmentAction = async (req, res) => {
    const { id, department, is_active, manager_id } = req.body;
    const { error } = departmentSchema.validate({ id, department, is_active });
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }
    try {
        if (!id) {
            const exists = await checkDepartmentExists(department);
            if (exists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.DUPLICATE_ENTRY,
                    data: {}
                });
            }
            const departmentId = await createDepartment(department, is_active, manager_id);
            res.status(201).json({
                status: true,
                message: SUCCESS_MESSAGES.DATA_CREATED,
                data: { departmentId }
            });
        } else {
            const exists = await checkDepartmentExists(department, id);
            if (exists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.DUPLICATE_ENTRY,
                    data: {}
                });
            }
            const result = await updateDepartment(id, department, is_active, manager_id);
            if (result) {
                res.status(200).json({
                    status: true,
                    message: SUCCESS_MESSAGES.DATA_UPDATED,
                    data: { id }
                });
            }
        }
    } catch (error) {
        console.error('Error department action:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const getDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await getDepartmentById(id);
        if (department) {
            res.status(200).json({
                status: true,
                message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
                data: department
            });
        } else {
            res.status(404).json({
                status: false,
                message: ERROR_MESSAGES.NOT_FOUND,
                data: {}
            });
        }
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};