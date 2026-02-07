import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import departmentRoutes from './routes/department.routes.js';
import employeeRoutes from './routes/employee.routes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/employee', employeeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Employee Management API' });
});

export default app;
