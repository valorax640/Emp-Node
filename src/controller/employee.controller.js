import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/message.js';
import { getAllEmployees, createEmployee, updateEmployee, getEmployeeById, checkEmailExists, checkMobileExists, employeeByDepartment, employeePagination } from "../model/employee.model.js";
import { employeeSchema } from "../validation/employee.validation.js";

export const getEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({
            status: true,
            message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const employeeAction = async (req, res) => {
    const { id, first_name, last_name, email, mobile, address, department_id } = req.body;
    const { error } = employeeSchema.validate({ id, first_name, last_name, email, mobile, address, department_id });
    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message,
            data: {}
        });
    }
    try {
        if (id) {
            const emailExists = await checkEmailExists(email, id);
            const mobileExists = await checkMobileExists(mobile, id);
            if (emailExists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
                    data: {}
                });
            }
            if (mobileExists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.MOBILE_ALREADY_EXISTS,
                    data: {}
                });
            }
            const result = await updateEmployee(id, first_name, last_name, email, mobile, address, department_id);
            if (result) {
                res.status(200).json({
                    status: true,
                    message: SUCCESS_MESSAGES.DATA_UPDATED,
                    data: { id }
                });
            }
        } else {
            const emailExists = await checkEmailExists(email);
            const mobileExists = await checkMobileExists(mobile);
            if (emailExists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
                    data: {}
                });
            }
            if (mobileExists) {
                return res.status(400).json({
                    status: false,
                    message: ERROR_MESSAGES.MOBILE_ALREADY_EXISTS,
                    data: {}
                });
            }
            const employeeId = await createEmployee(first_name, last_name, email, mobile, address, department_id);
            if (employeeId) {
                res.status(201).json({
                    status: true,
                    message: SUCCESS_MESSAGES.DATA_CREATED,
                    data: { id: employeeId }
                });
            }
        }
    } catch (error) {
        console.error('Error processing employee action:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const getEmployeeDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await getEmployeeById(id);
        if (employee) {
            res.status(200).json({
                status: true,
                message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
                data: employee
            });
        } else {
            res.status(404).json({
                status: false,
                message: ERROR_MESSAGES.NOT_FOUND,
                data: {}
            });
        }
    } catch (error) {
        console.error('Error fetching employee details:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const getEmployeesByDepartment = async (req, res) => {
    const { department_id } = req.params;
    try {
        const employees = await employeeByDepartment(department_id);
        res.status(200).json({
            status: true,
            message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees by department:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};

export const getEmployeesWithPagination = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    try {
        const employees = await employeePagination(parseInt(page), parseInt(limit), `%${search}%`);
        res.status(200).json({
            status: true,
            message: SUCCESS_MESSAGES.DATA_FETCH_SUCCESS,
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees with pagination:', error);
        res.status(500).json({
            status: false,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            data: {}
        });
    }
};
