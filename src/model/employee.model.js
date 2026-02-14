import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const getAllEmployees = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                e.id AS employee_id,
                e.first_name,
                e.last_name,
                e.email,
                e.mobile,
                e.address,
                e.department_id,
                d.department AS department
            FROM employee_master AS e
            LEFT JOIN department_master AS d
            ON e.department_id = d.id
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const createEmployee = async (first_name, last_name, email, mobile, address, department_id) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(email, 10);
        const [user_result] = await connection.query(
            'INSERT INTO user_master (first_name, last_name, email,password, role_id ) VALUES (?, ?, ?,?,2)',
            [first_name, last_name, email, hashedPassword]
        );
        const userId = user_result.insertId;
        const [result] = await connection.query(
            'INSERT INTO employee_master (first_name, last_name, email, mobile, address, department_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, mobile, address, department_id, userId]
        );
        await connection.commit();
        return result.insertId;
    } catch (error) {
        await connection.rollback();
        console.error('Error creating employee:', error);
        throw error;
    } finally {
        connection.release();
    }
};

export const updateEmployee = async (id, first_name, last_name, email, mobile, address, department_id) => {
    try {
        const [result] = await pool.query(
            'UPDATE employee_master SET first_name = ?, last_name = ?, email = ?, mobile = ?, address = ?, department_id = ? WHERE id = ?',
            [first_name, last_name, email, mobile, address, department_id, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee_master WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
};

export const checkEmailExists = async (email, excludeId = null) => {
    try {
        let query = 'SELECT COUNT(*) AS count FROM employee_master WHERE email = ?';
        const params = [email];
        if (excludeId) {
            query += ' AND id != ?';
            params.push(excludeId);
        }
        const [rows] = await pool.query(query, params);
        return rows[0].count > 0;
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error;
    }
};

export const checkMobileExists = async (mobile, excludeId = null) => {
    try {
        let query = 'SELECT COUNT(*) AS count FROM employee_master WHERE mobile = ?';
        const params = [mobile];
        if (excludeId) {
            query += ' AND id != ?';
            params.push(excludeId);
        }
        const [rows] = await pool.query(query, params);
        return rows[0].count > 0;
    } catch (error) {
        console.error('Error checking mobile existence:', error);
        throw error;
    }
};

export const employeeByDepartment = async (department_id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee_master WHERE department_id = ?', [department_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching employees by department:', error);
        throw error;
    }
};

export const employeePagination = async (page, limit, searchTerm) => {
    try {
        const offset = (page - 1) * limit;
        const [rows] = await pool.query(`
            SELECT 
                e.id AS employee_id,
                e.first_name,
                e.last_name,
                e.email,
                e.mobile,
                e.address,
                e.department_id,
                d.department AS department
            FROM employee_master AS e
            LEFT JOIN department_master AS d
            ON e.department_id = d.id 
            WHERE e.first_name LIKE ? OR e.last_name LIKE ? OR e.email LIKE ? OR e.address LIKE ? OR e.mobile LIKE ? OR d.department LIKE ?
            LIMIT ?, ?
        `, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, offset, limit]);
        return rows;
    } catch (error) {
        console.error('Error fetching employees with pagination:', error);
        throw error;
    }
};
