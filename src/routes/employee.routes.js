import express from 'express';
import { getEmployees, employeeAction, getEmployeeDetails, getEmployeesByDepartment, getEmployeesWithPagination } from '../controller/employee.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const employeeRoutes = express.Router();
employeeRoutes.use(verifyToken);

employeeRoutes.get('/get-all-employees', getEmployees);
employeeRoutes.post('/employee-action', employeeAction);
employeeRoutes.get('/get-employee-details/:id', getEmployeeDetails);
employeeRoutes.get('/get-employees-by-department/:department_id', getEmployeesByDepartment);
employeeRoutes.get('/get-employees-with-pagination', getEmployeesWithPagination);

export default employeeRoutes;
