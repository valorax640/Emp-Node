import pool from "../config/db.js";

export const getDepartments = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
	            d.id AS department_id,
	            d.department,
                d.is_active,
                d.manager_id,
                CONCAT(e.first_name, ' ', e.last_name) AS manager_name
            FROM department_master AS d 
            LEFT JOIN employee_master AS e 
            ON d.manager_id = e.id 
            WHERE is_active = '1'
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const createDepartment = async (department, is_active, manager_id) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO department_master (department, is_active, manager_id) VALUES (?, ?, ?)',
            [department, is_active, manager_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

export const updateDepartment = async (id, department, is_active, manager_id) => {
    try {
        const [result] = await pool.query(
            'UPDATE department_master SET department = ?, is_active = ?, manager_id = ? WHERE id = ?',
            [department, is_active, manager_id, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
};

export const getDepartmentById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM department_master WHERE id = ?', [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        throw error;
    }
};

export const checkDepartmentExists = async (department, excludeId = null) => {
    try {
        let query = 'SELECT COUNT(*) AS count FROM department_master WHERE department = ?';
        const params = [department];
        if (excludeId) {
            query += ' AND id != ?';
            params.push(excludeId);
        }
        const [rows] = await pool.query(query, params);
        return rows[0].count > 0;
    } catch (error) {
        console.error('Error checking department existence:', error);
        throw error;
    }
};
