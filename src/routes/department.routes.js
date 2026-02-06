import { listDepartments, departmentAction, getDepartment } from "../controller/department.controller.js";
import { decodeToken } from "../middleware/decodetoken.js";
import express from 'express';
const departmentRoutes = express.Router();

departmentRoutes.get('/all-departments', decodeToken, listDepartments);
departmentRoutes.post('/action', decodeToken, departmentAction);
departmentRoutes.get('/department-by-id/:id', decodeToken, getDepartment);

export default departmentRoutes;