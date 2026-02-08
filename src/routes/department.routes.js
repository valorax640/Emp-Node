import { listDepartments, departmentAction, getDepartment } from "../controller/department.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import express from 'express';

const departmentRoutes = express.Router();
departmentRoutes.use(verifyToken);
departmentRoutes.use(authorizeRole([1]));

departmentRoutes.get('/all-departments', listDepartments);
departmentRoutes.post('/action', departmentAction);
departmentRoutes.get('/department-by-id/:id', getDepartment);

export default departmentRoutes;