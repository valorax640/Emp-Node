import express from 'express';
import { getEmployees, employeeAction ,getEmployeeDetails} from '../controller/employee.controller.js';
import { decodeToken } from '../middleware/decodetoken.js';

const employeeRoutes = express.Router();
employeeRoutes.use(decodeToken);

employeeRoutes.get('/get-all-employees', getEmployees);
employeeRoutes.post('/employee-action', employeeAction);
employeeRoutes.get('/get-employee-details/:id', getEmployeeDetails);

export default employeeRoutes;
