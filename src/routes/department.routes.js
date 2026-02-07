import { listDepartments, departmentAction, getDepartment } from "../controller/department.controller.js";
import { decodeToken } from "../middleware/decodetoken.js";
import express from 'express';

const departmentRoutes = express.Router();
departmentRoutes.use(decodeToken);

departmentRoutes.get('/all-departments', listDepartments);
departmentRoutes.post('/action', departmentAction);
departmentRoutes.get('/department-by-id/:id', getDepartment);

export default departmentRoutes;